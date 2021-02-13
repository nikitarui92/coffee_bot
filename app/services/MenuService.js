

export default class MenuService {

    static instance = new MenuService()

    async getMenu() {
        return {
            drinks:
                [
                    {
                        name: 'Ammericano',
                        code: 'americ',
                        price: '120',
                    },
                    {
                        name: 'Cappucino',
                        code: 'capp',
                        price: '160',
                    },
                ]
        }
    }

}

