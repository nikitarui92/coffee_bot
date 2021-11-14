
export default class MenuService {

    static instance = new MenuService()

    async mainMenu() {
        return {
            drinks:
                [
                    {
                        name: 'Ammericano',
                        code: 'ammericano',
                        price: '120',
                    },
                    {
                        name: 'Cappucino',
                        code: 'cappucino',
                        price: '160',
                    },
                ]
        }
    }

    async howMuchCupsMenu() {
        return [
            {
                name: '☕',
                code: '1',
            },
            {
                name: '☕☕',
                code: '2',
            },
            {
                name: '☕☕☕',
                code: '3',
            },
        ]
    }

    async howMuchCupsMenu() {
        return [
            {
                name: '☕',
                code: '1',
            },
            {
                name: '☕☕',
                code: '2',
            },
            {
                name: '☕☕☕',
                code: '3',
            },
        ]
    }

    async whatTimeMenu() {
        return [
            {
                name: '5 min',
                code: '5',
            },
            {
                name: '10 min',
                code: '10',
            },
            {
                name: '15 min',
                code: '15',
            },
        ]
    }

}
