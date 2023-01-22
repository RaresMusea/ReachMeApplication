export const changeIconSource = (id, newSource) => {
    const element = document.getElementById(id);
    element.src = newSource;
}

export const resetIconSourceToDefault = (id, defaultSource) => {
    const element = document.getElementById(id);
    element.src = defaultSource;
}