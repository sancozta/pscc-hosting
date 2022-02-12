import { OnInit, ChangeDetectorRef, Component, Inject, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as _ from 'lodash';

import { FirebaseService } from '../services/firebase.service';
import { UtilsService } from '../services/utils.service';

import { FireCrudModelAbstract } from './fire-crud-model.abstract';
import { ModalContentComponent } from '../components/modal-content/modal-content.component';

@Component({
  template: '',
})
export abstract class FireCrud<T extends FireCrudModelAbstract> implements OnInit {

  object: T = <T>{};
  list: T[] = [];
  form: boolean = false;
  submitted: boolean = false;

  constructor(
    public firebase: FirebaseService,
    public utils: UtilsService,
    public dialog: MatDialog,
    public cdr: ChangeDetectorRef,
    @Inject('collection') public collection: string,
  ) { }

  ngOnInit(): void {
    this.reloadDataClear();
  }

  reloadDataClear(): void {
    this.submitted = false;
    this.form = false;
    this.object = <T>{};
  }

  openNew(): void {
    this.object = <T>{};
    this.submitted = false;
    this.form = true;
  }

  editObject(object: T): void {
    this.object = object;
    this.form = true;
  }

  @HostListener('document:keydown.escape')
  hideForm(): void {
    this.form = false;
    this.submitted = false;
  }

  abstract isValid(object: T): boolean;

  saveObject(): void {
    this.submitted = true;
    if (this.isValid(this.object)) {
      if (this.object.uid) {
        this.firebase.updateDoc(this.collection, this.object.uid, this.object).then(() => {
          const updateIndex = this.findIndexById(this.object.uid);
          this.list[updateIndex] = this.object;
          this.utils.snackBar('Item atualizado com sucesso!');
          this.reloadDataClear();
        }).catch(() => {
          this.utils.snackBar('Não foi possível atualizar o item!');
        });
      } else {
        const uid = this.firebase.createId();
        this.object.uid = uid;
        this.firebase.setDoc(this.collection, uid, this.object).then(() => {
          this.list.push(this.object);
          this.utils.snackBar('Item criado com sucesso!');
          this.reloadDataClear();
        }).catch(() => {
          this.utils.snackBar('Não foi possível criar o item!');
        });
      }
    } else {
      this.utils.snackBar('O formulário não é válido!');
    }
  }

  deleteObject(item: T): void {
    const dialogRef = this.dialog.open(ModalContentComponent, {
      data: {
        title: 'Atenção!',
        description: 'Você realmente deseja remover o item?',
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (item.uid) {
          this.firebase.deleteDoc(this.collection, item.uid).then(() => {
            this.list = this.list.filter(val => val.uid !== item.uid);
            this.utils.snackBar('Item excluído com sucesso!');
          }).catch(() => {
            this.utils.snackBar('Não foi possível remover o item!');
          });
        } else {
          this.utils.snackBar('Item incosistente!');
        }
      }
    });
  }

  findIndexById(id: string | undefined): number {
    let index = -1;
    for (let i = 0; i < this.list.length; i++) {
      if (this.list[i].uid === id) {
        index = i;
        break;
      }
    }
    return index;
  }
}
