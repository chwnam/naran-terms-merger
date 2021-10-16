function spanClasses(obj) {
    let classes = ['ntm-item-toggle', 'ntm-item-icon'];

    if (obj.collapsed) {
        classes.push('ntm-icon-chevron-up');
    } else {
        classes.push('ntm-icon-chevron-down');
    }

    return classes.join(' ');
}

function insideClasses(obj) {
    let classes = ['ntm-item-inside'];

    if (obj.collapsed) {
        classes.push('collapsed');
    }

    return classes.join(' ');
}

export {spanClasses, insideClasses};
