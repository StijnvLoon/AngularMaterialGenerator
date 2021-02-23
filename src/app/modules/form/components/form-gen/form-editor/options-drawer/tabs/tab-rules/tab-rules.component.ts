import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { verticalListAnimation, verticalListItemAnimation } from 'src/app/animations/vert-list';
import { AddRuleDialog } from 'src/app/modules/form/dialogs/addRuleDialog/add-rule-dialog';
import { FormOptions } from 'src/app/modules/form/models/FormOptions';
import { RuleService } from 'src/app/modules/form/services/rule.service';
import { SidenavService } from 'src/app/modules/form/services/sidenav.service';

@Component({
  selector: 'app-tab-rules',
  templateUrl: './tab-rules.component.html',
  styleUrls: ['./tab-rules.component.scss'],
  animations: [
    verticalListAnimation,
    verticalListItemAnimation
  ]
})
export class TabRulesComponent implements OnInit {

  @Input() options: FormOptions

  constructor(
    public sidenavService: SidenavService,
    private dialog: MatDialog,
    private ruleService: RuleService) { }

  ngOnInit(): void {
  }

  addRuleDialog() {
    const dialogRef = this.dialog.open(AddRuleDialog, {
      width: '800px',
      data: {
        title: 'Add rule',
        occupiedIdentifiers: this.ruleService.getErrorIdentifierList(this.options.rules)
      }
    });

    dialogRef.afterClosed().subscribe(async rule => {
      if (rule) {
        this.options.rules.push(rule)
      }
    })
  }

}
