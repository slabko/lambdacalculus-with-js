#!/usr/bin/env node

const log = (x) => process.stdout.write(x.toString());

////////////////////////////////////////////////////////////////////////////////
_true  = (x, y) => x;
_false = (x, y) => y;
_if_else = (c, x, y) => c(x, y)

// System helpers
printBool = bool => bool(() => log("true"), 
                         () => log("false"))()

////////////////////////////////////////////////////////////////////////////////
tp2 = (x, y) => (f) => f(x, y);
fst = tp => tp((x,y) => x)
snd = tp => tp((x,y) => y)

// System helpers
printTp2 = tp => tp ((x, y) => log("("+x+","+y+")"))();

////////////////////////////////////////////////////////////////////////////////
cons  = (x, xs) => (f) => f(x, xs);
nil   = (f) => _true;
isNil = c => c((x, xs) => _false)
head  = c => c((x, xs) => x);
tail  = c => c((x, xs) => xs);

foldl = (f, acc, xs) => 
    _if_else(isNil(xs),
        () => acc,
        () => foldl(f, f(acc, head(xs)), tail(xs)))()
        
foldr = (f, acc, xs) => 
    _if_else(isNil(xs),
        () => acc,
        () => f(head(xs), foldr(f, acc, tail(xs))))()

length = (xs) => foldl((n, x) => n+1, 0, xs)
sum = (xs) => foldl((s, x) => s+x, 0, xs)
reverse = (xs) => foldl((l, x) => cons(x, l), nil, xs)
append = (xs, ys) => foldr

// System helpers
fromArray = (arr) => reverse(arr.reduce((a, x) => cons(x, a), nil))
printList = xs => foldl((a, x) => log(x), '', xs)

////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////
log("\n\n--- print bool ---\n")
printBool(fst(tp2(_true, _false)))

log("\n\n--- if ... else ... ---\n")
_if_else(_true, 
    () => log("yes"), 
    () => log("no"))()

log("\n\n--- isNil ---\n")
printBool(isNil(cons("1", nil)))
log("\n")
printBool(isNil(nil))

log("\n\n--- print list ---\n")
list = cons(1, cons(2, cons(3, nil)))
printList(list)

log("\n\n--- list length ---\n")
log(length(list))

log("\n\n--- list sum ---\n")
log(sum(list))

log("\n\n--- list from JS array --\n")
const l = "hello".split('')
printList(fromArray(l))

