##Код выводит BAD: undefined

Предложите 2 варианта модификации кода, чтобы ответ был следующим: Bad: 10, Bad: 12, Good: 15, Good: 21

1: Можно заменить var на let. При использовнии var будет использоваться послденее значение: 4.
Значение let на каждой итерации попадает замкнется в вызываемой функции.

> const arr = [10, 12, 15, 21];
> for (let i = 0; i < arr.length; i++) {
> setTimeout(function() {
> console.log(arr[i] > 13 ? `GOOD: ${arr[i]}` : `BAD: ${arr[i]}`)}
> , 3000)
> }

2: Можно передать в setTimeout параметр, после функции и задержки и его же использовать как аргумент в самом колбеке.

> const arr = [10, 12, 15, 21];
> for (var i = 0; i < arr.length; i++) {
> setTimeout(function(i) {
> console.log(arr[i] > 13 ? `GOOD: ${arr[i]}` : `BAD: ${arr[i]}`)}
> , 3000, i)
> }
