import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('main.tsx', () => {
    it('should render without crashing', () => {
        const { container } = render(<div id="root" />);
        expect(container).toBeInTheDocument();
    });

    it('should find root element', () => {
        document.body.innerHTML = '<div id="root"></div>';
        expect(document.getElementById('root')).toBeInTheDocument();
    });
});
