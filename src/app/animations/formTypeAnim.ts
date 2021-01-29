import { trigger, animate, style, transition, animateChild, query, stagger, state } from '@angular/animations';

export const formTypeAnimation =
    trigger('Anim-formtype', [
        state('close', style({
            opacity: 0,
            height: '0px'
        })),
        state('open', style({
            opacity: 1,
            height: '*'
        })),
        transition('close => open', animate('0.3s ease')),
        transition('open => close', animate('0.3s ease'))
    ])