import {
  animate,
  keyframes,
  query,
  stagger,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

export const subCategoryAnimation =  trigger('subCategoryInOut', [
  transition('void => *', [

    query(':enter', style({ opacity: 0 }), {optional: true}),

    query(':enter', stagger('100ms',
      [
        animate('200ms cubic-bezier(0.4, 0.0, 0.2, 1)',
          keyframes(
            [
              style({opacity: 0, transform: 'translateY(40px)'}),
              style({opacity: 1, transform: 'translateY(0)'}),
            ]
          )
        )
      ]
    ), {optional: true}),

    query(':leave',
      animate('200ms cubic-bezier(0.4, 0.0, 0.2, 1)',
        keyframes([
          style({opacity: 1}),
          style({opacity: 0}),
        ])
      ), {optional: true}
    )

  ])
])
