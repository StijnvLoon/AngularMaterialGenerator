import { trigger, animate, transition, style, query, group } from '@angular/animations';

export const routeAnimation =

    trigger('routeAnimation', [
        transition('* => *', [
            query(':enter',
                [
                    style({ opacity: 0, transform: 'scale(0.8) translateY(-200px)' }),
                ],
                { optional: true }
            ),
            group([
                query(':leave',
                    [
                        style({ opacity: 1, transform: 'scale(1.0)' }),
                        animate('0.3s ease-in-out', style({ opacity: 0, transform: 'scale(0.8) translateY(-200px)' }))
                    ],
                    { optional: true }
                ),
                query(':enter',
                    [
                        style({ opacity: 0, transform: 'scale(0.8) translateY(-200px)' }),
                        animate('0.3s ease-in-out', style({ opacity: 1, transform: 'scale(1.0)' }))
                    ],
                    { optional: true }
                )
            ])
        ])
    ]);