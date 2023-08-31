import { doPackAdd, doItemAddBatch } from '../axios/pack.api.js'
import { doGetGameSelect } from '../axios/game.api.js'
import { alertSuccess, alertLinkAfterSuccess } from '../axios/alerts.js'

var selectData
// 加载下拉框数据
$(document).ready(function () {
  doGetGameSelect()
    .then(function (response) {
      selectData = response.data.result
      $('.js-example-basic-single').select2({
        data: selectData,
      })
    })
    .catch(function (error) {
      console.log(error)
    })
})

// 界面js
var paymentSign = '$'

// 更换货币
document
  .querySelector('#choices-payment-currency')
  .addEventListener('change', function () {
    var e = document.getElementById('choices-payment-currency').value
    ;(paymentSign = e),
      Array.from(document.getElementsByClassName('product-line-price')).forEach(
        function (e) {
          ;(isUpdate = e.value.slice(1)), (e.value = paymentSign + isUpdate)
        }
      ),
      recalculateCart()
  })

// 展示价格
Array.from(document.getElementsByClassName('product-line-price')).forEach(
  function (e) {
    e.value = paymentSign + '0.00'
  }
)
var isPaymentEl = document.getElementById('choices-payment-currency'),
  choices = new Choices(isPaymentEl, { searchEnabled: !1 })

// 数量增减
function isData() {
  var e = document.getElementsByClassName('plus'),
    t = document.getElementsByClassName('minus')
  e &&
    Array.from(e).forEach(function (n) {
      n.onclick = function (e) {
        var t
        parseInt(n.previousElementSibling.value) < 10 &&
          (e.target.previousElementSibling.value++,
          (e =
            n.parentElement.parentElement.previousElementSibling.querySelector(
              '.product-price'
            ).value),
          (t = n.parentElement.parentElement.nextElementSibling.querySelector(
            '.product-line-price'
          )),
          updateQuantity(
            n.parentElement.querySelector('.product-quantity').value,
            e,
            t
          ))
      }
    }),
    t &&
      Array.from(t).forEach(function (n) {
        n.onclick = function (e) {
          var t
          1 < parseInt(n.nextElementSibling.value) &&
            (e.target.nextElementSibling.value--,
            (e =
              n.parentElement.parentElement.previousElementSibling.querySelector(
                '.product-price'
              ).value),
            (t = n.parentElement.parentElement.nextElementSibling.querySelector(
              '.product-line-price'
            )),
            updateQuantity(
              n.parentElement.querySelector('.product-quantity').value,
              e,
              t
            ))
        }
      })
}
isData()

// 处理新增道具列
var count = 1
document.querySelector('#add-item').addEventListener('click', function () {
  count++
  var e = document.createElement('tr'),
    t =
      ((e.id = count),
      (e.className = 'product'),
      '<tr><th scope="row" class="product-id">' +
        count +
        '</th><td class="text-start"><div class="mb-2"><input class="form-control bg-light border-0" type="text" id="productName-' +
        count +
        '" placeholder="Product Name"></div></div></td><td><input class="form-control bg-light border-0 product-price" type="number" id="productRate-' +
        count +
        '" step="0.01" placeholder="$0.00"></td><td><div class="input-step"><button type="button" class="minus">–</button><input type="number" class="product-quantity" id="product-qty-' +
        count +
        '" value="0" readonly><button type="button" class="plus">+</button></div></td><td class="text-end"><div><input type="text" class="form-control bg-light border-0 product-line-price" id="productPrice-' +
        count +
        '" value="$0.00" placeholder="$0.00" /></div></td><td class="product-removal"><a class="btn btn-success">Delete</a></td></tr>'),
    t =
      ((e.innerHTML = document.getElementById('newForm').innerHTML + t),
      document.getElementById('newlink').appendChild(e),
      document.querySelectorAll('[data-trigger]'))
  isData(), remove(), amountKeyup(), resetRow()
})
remove()

// 清除
var discountRate = 0
function remove() {
  Array.from(document.querySelectorAll('.product-removal a')).forEach(function (
    e
  ) {
    e.addEventListener('click', function (e) {
      removeItem(e), resetRow()
    })
  })
}

// 重置行
function resetRow() {
  Array.from(document.getElementById('newlink').querySelectorAll('tr')).forEach(
    function (e, t) {
      t += 1
      e.querySelector('.product-id').innerHTML = t
    }
  )
}

// 礼包道具价值计算
function recalculateCart() {
  discountRate =
    document.getElementById('Discount').value != '' &&
    document.getElementById('Discount').value > 0
      ? document.getElementById('Discount').value
      : discountRate
  var t = 0,
    e =
      (Array.from(document.getElementsByClassName('product')).forEach(function (
        e
      ) {
        Array.from(e.getElementsByClassName('product-line-price')).forEach(
          function (e) {
            e.value && (t += parseFloat(e.value.slice(1)))
          }
        )
      }),
      t),
    n = t * discountRate,
    a = t - n
  ;(document.getElementById('cart-subtotal').value =
    paymentSign + t.toFixed(2)),
    (document.getElementById('cart-total').value = paymentSign + n.toFixed(2)),
    (document.getElementById('cart-discount').value =
      paymentSign + a.toFixed(2))
}

// 道具数量增加
function amountKeyup() {
  Array.from(document.getElementsByClassName('product-price')).forEach(
    function (n) {
      n.addEventListener('keyup', function (e) {
        var t =
          n.parentElement.nextElementSibling.nextElementSibling.querySelector(
            '.product-line-price'
          )
        updateQuantity(
          e.target.value,
          n.parentElement.nextElementSibling.querySelector('.product-quantity')
            .value,
          t
        )
      })
    }
  )
}

// 更新价格
function updateQuantity(e, t, n) {
  e = (e = e * t).toFixed(2)
  ;(n.value = paymentSign + e), recalculateCart()
}
// 去除道具
function removeItem(e) {
  e.target.closest('tr').remove(), recalculateCart()
}
amountKeyup()

// 数据提交
document.addEventListener('DOMContentLoaded', function () {
  var T = document.getElementById('invoice_form')
  document.getElementsByClassName('needs-validation')
  T.addEventListener('submit', function (e) {
    e.preventDefault()
    // 礼包数据
    var id = document.getElementById('PackId').value,
      name = document.getElementById('Name').value,
      discount = document.getElementById('Discount').value,
      game_id = document.getElementById('GameId').value,
      desc = document.getElementById('Desc').value,
      order = document.getElementById('Order').value,
      org_price = document.getElementById('cart-subtotal').value.slice(1),
      price = document.getElementById('cart-total').value.slice(1),
      product = document.getElementsByClassName('product'),
      N = 1,
      items = []
    // 道具数据
    Array.from(product).forEach((e) => {
      var t = e.querySelector('#productName-' + N).value,
        a = parseInt(e.querySelector('#product-qty-' + N).value),
        e = e.querySelector('#productPrice-' + N).value.split('$'),
        t = {
          pack_id: id,
          name: t,
          amount: a,
          price: parseInt(e[1]),
        }
      items.push(t), N++
    })

    // 新增礼包
    doPackAdd({
      id: id,
      game_id: game_id,
      name: name,
      desc: desc,
      price: price,
      org_price: org_price,
      discount: discount * 100,
      order: order,
    })
      .then(function (response) {
        alertSuccess({
          message: response.data.message,
        })
        // 成功继续添加道具
        console.log(items.length)
        if (items.length >= 1) {
          doItemAddBatch(items)
            .then(function (res) {
              alertSuccess({
                message: res.data.message,
              })
              console.log(res)
            })
            .catch(function (error) {
              console.log(error)
            })
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  })
})
