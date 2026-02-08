import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';

jest.mock('./core/i18n', () => ({
    i18n: {
        use: jest.fn().mockReturnThis(),
        init: jest.fn().mockResolvedValue(undefined)
    }
}));

jest.mock('react-dom/client', () => {
    const original = jest.requireActual('react-dom/client');
    return {
        ...original,
        createRoot: jest.fn()
    };
});

describe('main entry', () => {
    let rootMock: any;

    beforeEach(() => {
        rootMock = { render: jest.fn() };
        (createRoot as jest.Mock).mockReturnValue(rootMock);
        document.body.innerHTML = '<div id="root"></div>';
    });

    it('should render App inside StrictMode', () => {
        require('./main'); // o './index' según tu archivo real

        expect(createRoot).toHaveBeenCalledWith(document.getElementById('root'));
        expect(rootMock.render).toHaveBeenCalledTimes(1);
        const renderedElement = rootMock.render.mock.calls[0][0];
        expect(renderedElement.type).toBe(StrictMode);
        // Aquí puedes comprobar que App está renderizado, aunque esté dentro de StrictMode
        expect(renderedElement.props.children.type.name).toBe('App');
    });
});
