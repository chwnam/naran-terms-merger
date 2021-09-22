class Slot {
    static #sequence = 1;

    #title = '';

    #id = 0;

    #collapsed = true;

    constructor(title) {
        this.setTitle('undefined' === typeof title ? ('Slot #' + Slot.#sequence) : title)
        this.#id = Slot.#sequence;
        ++Slot.#sequence;
    }

    getId() {
        return this.#id;
    }

    getTitle() {
        return this.#title;
    }

    setTitle(title) {
        this.#title = title;
        return this;
    }

    isCollapsed() {
        return this.#collapsed;
    }

    toggle() {
        this.#collapsed = !this.#collapsed;
        return this;
    }
}

export default Slot;
