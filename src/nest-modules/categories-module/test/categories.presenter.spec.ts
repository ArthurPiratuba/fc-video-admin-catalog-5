import { CategoryCollectionPresenter, CategoryPresenter } from '../categories.presenter';

describe('CategoryPresenter Unit Tests', () => {
    describe('constructor', () => {
        it('should set values', () => {
            const presenter = new CategoryPresenter({
                created_at: new Date(),
                description: "Descrição",
                id: "3b8c4f2c-aff9-4399-a72a-ad879e5689a2",
                is_active: true,
                name: "Nome de Teste"
            });
            expect(presenter.created_at).toBeInstanceOf(Date);
            expect(presenter.description).toBe("Descrição");
            expect(presenter.id).toBe("3b8c4f2c-aff9-4399-a72a-ad879e5689a2");
            expect(presenter.is_active).toBeTruthy();
            expect(presenter.name).toBe("Nome de Teste");
        });
    });
});

describe('CategoryCollectionPresenter Unit Tests', () => {
    describe('constructor', () => {
        it('should set values', () => {
            const presenter = new CategoryCollectionPresenter({
                items: [{
                    created_at: new Date(),
                    description: "Descrição 1",
                    id: "3b8c4f2c-aff9-4399-a72a-ad879e5689a2",
                    is_active: true,
                    name: "Nome de Teste 1"
                }, {
                    created_at: new Date(),
                    description: "Descrição 2",
                    id: "070cdeef-5bd3-4e09-80df-6c88f88ea8ca",
                    is_active: false,
                    name: "Nome de Teste 2"
                }],
                total: 1,
                current_page: 2,
                last_page: 3,
                per_page: 4
            });
            expect(presenter.data[0].created_at).toBeInstanceOf(Date);
            expect(presenter.data[0].description).toBe("Descrição 1");
            expect(presenter.data[0].id).toBe("3b8c4f2c-aff9-4399-a72a-ad879e5689a2");
            expect(presenter.data[0].is_active).toBeTruthy();
            expect(presenter.data[0].name).toBe("Nome de Teste 1");
            expect(presenter.data[1].created_at).toBeInstanceOf(Date);
            expect(presenter.data[1].description).toBe("Descrição 2");
            expect(presenter.data[1].id).toBe("070cdeef-5bd3-4e09-80df-6c88f88ea8ca");
            expect(presenter.data[1].is_active).toBeFalsy();
            expect(presenter.data[1].name).toBe("Nome de Teste 2");
            expect(presenter.data.length).toBe(2);
        });
    });
});



