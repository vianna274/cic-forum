import { trigger, animate, style, group, animateChild, query, stagger, transition, state } from '@angular/animations';

export const subCategoryAnimation =  trigger('subCategoryInOut', [
  transition('void => *', [
      style({
        transform: 'translateY(-100%)',
        opacity: '1'
      }),
      animate(800)
  ]),
  transition('* => void', [
      animate(800, 
        style({
          transform: 'translateY(-100%)',
          opacity: '0'
        }))
  ])
])
