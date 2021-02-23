import { Injectable } from '@angular/core';
import { ValidatorFn, Validators } from '@angular/forms';
import { ErrorIdentifier } from 'dist/AMG/assets/errorIdentifier';
import { Rule } from '../models/Rule';

@Injectable({
    providedIn: 'root'
})
export class RuleService {

    constructor() { }

    getValidator(rule: Rule): ValidatorFn {
        switch (rule.errorIdentifier) {
            case ErrorIdentifier.REQUIRED: {
                return Validators.required
            }
            case ErrorIdentifier.EMAIL: {
                return Validators.email
            }
            case ErrorIdentifier.PATTERN: {
                return Validators.pattern(rule.attr)
            }
            case ErrorIdentifier.MIN: {
                return Validators.min(rule.attr)
            }
            case ErrorIdentifier.MAX: {
                return Validators.max(rule.attr)
            }
            case ErrorIdentifier.MINLENGTH: {
                return Validators.minLength(rule.attr)
            }
            case ErrorIdentifier.MAXLENGTH: {
                return Validators.maxLength(rule.attr)
            }
            case ErrorIdentifier.REQUIREDTRUE: {
                return Validators.requiredTrue
            }
        }
    }

    getValidatorList(ruleList: Rule[]): ValidatorFn[] {
        const list: ValidatorFn[] = []
        ruleList.forEach((rule) => {
            list.push(this.getValidator(rule))
        })

        return list
    }

    getErrorIdentifierList(ruleList: Rule[]): ErrorIdentifier[] {
        const list: ErrorIdentifier[] = []

        ruleList.forEach(rule => {
            list.push(rule.errorIdentifier)
        });

        return list
    }

    getErrorMessage(ruleList: Rule[], errorIdentifier: ErrorIdentifier): string {
        const rule = ruleList.filter((rule) => rule.errorIdentifier == errorIdentifier)[0]

        if(rule) {
            return rule.errorMessage
        } else {
            return ''
        }
    }


}
