import { trigger, animate, style, transition, animateChild, query, stagger } from '@angular/animations';

export const verticalListAnimation =
    trigger('items_anim', [
        transition(':enter', [
            style({ height: '0px', opacity: 0}),  // initial
            animate('0.3s ease',
                style({ height: '*', opacity: 1 }))  // final
        ]),
        transition(':leave', [
            style({ height: '*', opacity: 1 }),
            animate('0.3s ease',
                style({ height: '0px', opacity: 0 }))
        ])
    ])

export const verticalListItemAnimation =
    trigger('list_anim', [
        transition(':enter', [
            query('@items_anim', stagger(100, animateChild()))
        ]),
    ])
