/**
 * to be used in array.sort()
 */
export default (item1, item2) => {
    return (item1.weight || Infinity) - (item2.weight || Infinity)
}