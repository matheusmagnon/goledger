import {render} from '@testing-library/react';
import {StreamingProvider} from '../context/StreamingContext'
import { ReactElement } from 'react';

const renderWithContext = (ui: ReactElement) =>
    render(ui, { wrapper: StreamingProvider });
  
  export * from "@testing-library/react";
  
  export { renderWithContext as render };