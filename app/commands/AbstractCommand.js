

export default class AbstractCommand {

    get name(){ return '' }

    run(){
        const cb = async (ctx) => {
            console.time(`exec "${this.name}" cmd`)
            await this.exec(ctx)
            console.timeEnd(`exec "${this.name}" cmd`)
        }
        return cb
    }

    async exec(ctx){}

}

