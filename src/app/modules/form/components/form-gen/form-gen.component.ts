import { Component, OnInit, ViewChild } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TextDialog } from 'src/app/dialogs/textDialog/text-dialog';
import { SidenavService } from 'src/app/modules/form/services/sidenav.service';
import { LocalStorageService } from 'src/app/services/localStorage.service';
import { NotificationService } from 'src/app/services/notification.service';
import { ThemeSheet } from 'src/app/sheets/theme-sheet/theme-sheet';
import { FormTemplate } from '../../models/FormTemplate';
import { FormTemplateService } from '../../services/formtemplate.service';
import { FormCodeComponent } from './form-code/form-code.component';
import { FormEditorComponent } from './form-editor/form-editor.component';

@Component({
  selector: 'app-form-gen',
  templateUrl: './form-gen.component.html',
  styleUrls: ['./form-gen.component.scss']
})
export class FormGenComponent implements OnInit {

  public formTemplate: FormTemplate
  @ViewChild(FormCodeComponent) private formCodeComponent: FormCodeComponent;
  @ViewChild(FormEditorComponent) private formEditorComponent: FormEditorComponent;

  constructor(
    private sidenavService: SidenavService,
    private route: ActivatedRoute,
    private sheet: MatBottomSheet,
    private dialog: MatDialog,
    public formtemplateService: FormTemplateService,
    private localStorageService: LocalStorageService,
    private notificationService: NotificationService,
    private router: Router) { }

  ngOnInit(): void {
    let id: string = this.route.snapshot.paramMap.get('id')
    let idNumber: number = +id

    this.formTemplate = this.localStorageService.getFormTemplate(idNumber, onError => {
      console.log('no template found with this index!')
    })
  }

  onTabChanged($event) {
    if ($event.tab.textLabel == 'Code') {
      this.sidenavService.close()
      this.formCodeComponent.updatePreview()
    }
    this.formEditorComponent.tabIsActive = $event.tab.textLabel == 'Editor'
  }

  onTemplateUpload($event) {
    const file = $event.target.files[0]

    this.formtemplateService.convertUploadedFile(file, (formTemplate: FormTemplate) => {
      this.formTemplate = formTemplate
      this.formEditorComponent.refreshSavables(this.formTemplate)
    },
      (err) => {
        console.log(err)
      })
  }

  openThemeSheet() {
    this.sheet.open(ThemeSheet);
  }

  saveTemplate() {
    let id: string = this.route.snapshot.paramMap.get('id')
    let idNumber: number = +id

    if(idNumber == 0) {
      const newIndex: number = this.localStorageService.saveFormTemplate(this.formTemplate)
      this.router.navigate(['/forms/' + newIndex])
      this.notificationService.notify("New template saved on index: " + idNumber)
    } else {
      this.localStorageService.updateFormTemplate(idNumber, this.formTemplate)
      this.notificationService.notify("Template updated")
    }
  }

  editNameDialog() {
    const nameCopy: string = this.formTemplate.name
    const dialogRef = this.dialog.open(TextDialog, {
      width: '600px',
      data: {
        title: 'Change template name',
        text: nameCopy
      }
    });

    dialogRef.afterClosed().subscribe(async name => {
      if (name) {
        this.formTemplate.name = name
      }
    })
  }
}
