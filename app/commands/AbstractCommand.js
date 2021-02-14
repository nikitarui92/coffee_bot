

export default class AbstractCommand {

    get name(){ return '' }

    async run(){
        await this.init()
        const cb = async (ctx) => {
            console.time(`exec "${this.name}" cmd`)
            await this.exec(ctx)
            console.timeEnd(`exec "${this.name}" cmd`)
        }
        return cb
    }

    async exec(ctx){}

    async init(){}

}
