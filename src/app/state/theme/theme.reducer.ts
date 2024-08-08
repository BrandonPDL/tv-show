import { createReducer, on, Action } from '@ngrx/store';
import { toggleTheme } from './theme.actions';

export interface ThemeState {
  isDarkMode: boolean;
}

export const initialState: ThemeState = {
  isDarkMode: false
};

const _themeReducer = createReducer(
  initialState,
  on(toggleTheme, state => ({ ...state, isDarkMode: !state.isDarkMode }))
);

export function themeReducer(state: ThemeState | undefined, action: Action) {
  return _themeReducer(state, action);
}
