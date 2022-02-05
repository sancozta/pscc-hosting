import { OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { FirebaseService } from './../services/firebase.service';
import { UtilsService } from './../services/utils.service';

import { FireCrudModelAbstract } from './fire-crud-model.abstract';
import { ModalContentComponent } from './../components/modal-content/modal-content.component';

export abstract class FireCrud<T extends FireCrudModelAbstract> implements OnInit {

  object: T;
  list: T[];
  form: boolean;
  submitted: boolean;

  constructor(
    public firebase: FirebaseService,
    public utils: UtilsService,
    public dialog: MatDialog,
    public cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.reloadDataClear();
  }

  reloadDataClear(): void {
    this.submitted = false;
    this.form = false;
    Object.keys(this.object).forEach((k) => (typeof k !== 'function') ? this.object[k] = null : '');
  }

  openNew(): void {
    Object.keys(this.object).forEach((k) => (typeof k !== 'function') ? this.object[k] = null : '');
    this.submitted = false;
    this.form = true;
  }

  editObject(object: T): void {
    Object.keys(this.object).forEach((k) => {
      if (k in object) {
        this.object[k] = object[k];
      }
    });
    this.form = true;
  }

  hideForm(): void {
    this.form = false;
    this.submitted = false;
  }

  abstract isValid(object: T): boolean;

  saveObject(): void {
    this.submitted = true;
    if (this.isValid(this.object)) {
      if (this.object.uid) {
        this.firebase.updateDoc(this.object.collection(), this.object.uid, this.object).then(() => {
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
        this.firebase.setDoc(this.object.collection(), uid, this.object).then(() => {
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
          this.firebase.deleteDoc(this.object.collection(), item.uid).then(() => {
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

  findIndexById(id: string): number {
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
