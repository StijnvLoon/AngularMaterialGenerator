import { trigger, animate, style, transition, animateChild, query, stagger, state } from '@angular/animations';

export const verticalListAnimation =
    trigger('Anim-ListVerItems', [
        transition(':enter', [
            style({ transform: 'scale(0.5)', opacity: 0 }),  // initial
            animate('0.6s cubic-bezier(.8, -0.6, 0.2, 1.5)',
                style({ transform: 'scale(1)', opacity: 1 }))  // final
        ]),
        transition(':leave', [
            style({ transform: 'scale(1)', opacity: 1, height: '*' }),
            animate('0.6s cubic-bezier(.8, -0.6, 0.2, 1.5)',
                style({
                    transform: 'scale(0.5)', opacity: 0,
                    height: '0px', margin: '0px'
                }))
        ])
    ])

export const verticalListItemAnimation =
    trigger('Anim-ListVerHost', [
        transition(':enter', [
            query('@Anim-ListVerItems', stagger(300, animateChild()), { optional: true })
        ]),
    ])
