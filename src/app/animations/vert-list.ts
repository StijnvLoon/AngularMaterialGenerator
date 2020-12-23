import { trigger, animate, style, transition, animateChild, query, stagger, state } from '@angular/animations';

export const verticalListAnimation =
    trigger('verticalListAnimation', [
        // transition(':enter', [
        //     style({ height: '0px', opacity: 0}),  // initial
        //     animate('3s ease',
        //         style({ height: '*', opacity: 1 }))  // final
        // ]),
        // transition(':leave', [
        //     style({ height: '*', opacity: 1 }),
        //     animate('0.3s ease',
        //         style({ height: '0px', opacity: 0 }))
        // ])
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

export const verticalListItemAnimation =
    trigger('list_anim', [
        transition(':enter', [
            query('@items_anim', stagger(100, animateChild()))
        ]),
    ])
