class Term {
    #termId = 0;

    #name = '';

    #slug = '';

    #count = 0;

    #parent = 0;

    #description = '';

    #collapsed = true;

    #slotId = 0;

    constructor(item = null) {
        if (item) {
            this.#termId = item.id;
            this.#name = item.name;
            this.#slug = item.slug;
            this.#count = item.count;
            this.#parent = item.parent;
            this.#description = item.description;
            this.#collapsed = true;
            this.#slotId = 0;
        }
    }

    getTermId() {
        return this.#termId;
    }

    setTermId(termId) {
        this.#termId = termId;
        return this;
    }

    getName() {
        return this.#name;
    }

    setName(name) {
        this.#name = name;
        return this;
    }

    getSlug() {
        return this.#slug;
    }

    setSlug(slug) {
        this.#slug = slug;
        return this;
    }

    getCount() {
        return this.#count;
    }

    setCount(count) {
        this.#count = count;
        return this;
    }

    getParent() {
        return this.#parent;
    }

    setParent(parent) {
        this.#parent = parent;
        return this;
    }

    getDescription() {
        return this.#description;
    }

    setDescription(description) {
        this.#description = description;
        return this;
    }

    isCollapsed() {
        return this.#collapsed;
    }

    setCollapsed(collapsed) {
        this.#collapsed = collapsed;
        return this;
    }

    getSlotId() {
        return this.#slotId;
    }

    setSlotId(slotId) {
        this.#slotId = slotId;
        return this;
    }
}

export default Term;
