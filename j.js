let masss = [1,2]
console.log(masss)
var rotate = function(nums, k) {
  k = k % nums.length
  const med = nums.length - k
  let result = []
  let aft = nums.slice(med)
  nums.splice(med,nums.length)
  nums.unshift(...aft)
};
console.log(rotate(masss, 3)) //[4,5,6,1,2,3]
console.log(masss)

