// 0-2h                 1
// 2h – 5h              1
// 5h – 8h              2
// 8h – 12h             2
// 12h – 20h            2
// 20h – 50h            3
// 50h – 100h           3
// 100h +               3

// Cada faixa tem um multiplicador para o peso da tag, que são respectivamente: 1,1,2,2,2,3,3.
// Portanto, quando um usuário marca positivo em uma tag e está na faixa de 50h, ao invés de
// somar “+1” aos positivos da tag, somará “(+1 * 3)”.
const weightCalculator = (time : number | null | undefined) : number => {
    if(typeof time != "number")
        return 1
    switch (true) {
        case (time < 5):
            return 1
        case (time >= 5 && time < 20):
            return 2
        case (time >= 20):
            return 3
    }
    return 1
}

export {
    weightCalculator
}