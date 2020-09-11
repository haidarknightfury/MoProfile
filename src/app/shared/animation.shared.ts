import {trigger, style, state, transition, animate} from '@angular/animations';


export const defaultState = state('in', style({ opacity: 1, transform: 'translateX(0)'}));
export const formTransition =  transition('void => *', [style({ opacity: 0, transform: 'translateX(-50px)' }), animate(300) ])
export const formEntryAnimation = trigger('formState',[ defaultState, formTransition])