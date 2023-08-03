function getChartColorsArray(e) {
  if (null !== document.getElementById(e))
    return (
      (e = document.getElementById(e).getAttribute('data-colors')),
      (e = JSON.parse(e)).map(function (e) {
        var t = e.replace(' ', '')
        return -1 === t.indexOf(',')
          ? getComputedStyle(document.documentElement).getPropertyValue(t) || t
          : 2 == (e = e.split(',')).length
          ? 'rgba(' +
            getComputedStyle(document.documentElement).getPropertyValue(e[0]) +
            ',' +
            e[1] +
            ')'
          : t
      })
    )
}
var options,
  chart,
  chartDonutBasicColors = getChartColorsArray('simple_dount_chart'),
  url =
    (chartDonutBasicColors &&
      ((options = {
        series: [98, 63, 35],
        labels: ['New Application', 'Approved', 'Rejected'],
        chart: { height: 300, type: 'donut' },
        legend: { position: 'bottom' },
        dataLabels: { dropShadow: { enabled: !1 } },
        colors: chartDonutBasicColors,
      }),
      (chart = new ApexCharts(
        document.querySelector('#simple_dount_chart'),
        options
      )).render()),
    'assets/json/'),
  allJobList = '',
  editList = !1,
  prevButton = document.getElementById('page-prev'),
  nextButton = document.getElementById('page-next'),
  currentPage = 1,
  itemsPerPage = 3,
  getJSON = function (e, t) {
    var n = new XMLHttpRequest()
    n.open('GET', url + e, !0),
      (n.responseType = 'json'),
      (n.onload = function () {
        var e = n.status
        t(200 === e ? null : e, n.response)
      }),
      n.send()
  }
function loadJobListData(e, t) {
  var n = Math.ceil(e.length / itemsPerPage)
  n < (t = t < 1 ? 1 : t) && (t = n),
    (document.querySelector('#job-list').innerHTML = '')
  for (
    var o, a, i = (t - 1) * itemsPerPage;
    i < t * itemsPerPage && i < e.length;
    i++
  )
    e[i] &&
      e[i].tags &&
      ((o = e[i].tags),
      (a = ''),
      Array.from(o).forEach((e, t) => {
        a += '<span class="badge badge-soft-primary me-1">' + e + '</span>'
      })),
      e[i] &&
        (document.querySelector('#job-list').innerHTML +=
          '<div class="card joblist-card">            <div class="card-body">                <div class="d-flex mb-4">                    <div class="avatar-sm">                        <div class="avatar-title bg-light rounded">                            <img src="' +
          e[i].companyLogo +
          '" alt="" class="avatar-xxs companyLogo-img">                        </div>                    </div>                    <div class="ms-3 flex-grow-1">                        <img src="' +
          e[i].coverImg +
          '" alt="" class="d-none cover-img">                        <a href="#!"><h5 class="job-title">' +
          e[i].jobTitle +
          '</h5></a>                        <p class="company-name text-muted mb-0">' +
          e[i].companyName +
          '</p>                    </div>                    <div>                        <button type="button" class="btn btn-ghost-primary btn-icon custom-toggle" data-bs-toggle="button">                            <span class="icon-on"><i class="ri-bookmark-line"></i></span>                            <span class="icon-off"><i class="ri-bookmark-fill"></i></span>                        </button>                    </div>                </div>                <p class="text-muted job-description">' +
          e[i].description +
          '</p>                <div>' +
          a +
          '</div>            </div>            <div class="card-footer border-top-dashed">                <div class="d-flex justify-content-between align-items-center flex-wrap gap-3">                    <div><i class="ri-briefcase-2-line align-bottom me-1"></i> <span class="job-type">' +
          e[i].type +
          '</span></div>                    <div class="d-none"><span class="job-experience">' +
          e[i].experience +
          '</span></div>                    <div><i class="ri-map-pin-2-line align-bottom me-1"></i>  <span class="job-location">' +
          e[i].location +
          '</span></div>                    <div><i class="ri-user-3-line align-bottom me-1"></i> ' +
          e[i].applied +
          '</div>                    <div><i class="ri-time-line align-bottom me-1"></i> <span class="job-postdate">' +
          e[i].postDate +
          '</span></div>                    <div><a href="#!" class="btn btn-primary viewjob-list">View More <i class="ri-arrow-right-line align-bottom ms-1"></i></a></div>                </div>            </div>        </div>')
  ;(document.getElementById('total-result').innerHTML = e.length),
    selectedPage(),
    1 == currentPage
      ? prevButton.parentNode.classList.add('disabled')
      : prevButton.parentNode.classList.remove('disabled'),
    currentPage == n
      ? nextButton.parentNode.classList.add('disabled')
      : nextButton.parentNode.classList.remove('disabled'),
    jobDetailShow()
}
function selectedPage() {
  for (
    var e = document
        .getElementById('page-num')
        .getElementsByClassName('clickPageNumber'),
      t = 0;
    t < e.length;
    t++
  )
    t == currentPage - 1
      ? e[t].parentNode.classList.add('active')
      : e[t].parentNode.classList.remove('active')
}
function paginationEvents() {
  function e() {
    return Math.ceil(allJobList.length / itemsPerPage)
  }
  prevButton.addEventListener('click', function () {
    1 < currentPage && loadJobListData(allJobList, --currentPage)
  }),
    nextButton.addEventListener('click', function () {
      currentPage < e() && loadJobListData(allJobList, ++currentPage)
    })
  var t = document.getElementById('page-num')
  t.innerHTML = ''
  for (var n = 1; n < e() + 1; n++)
    t.innerHTML +=
      "<div class='page-item'><a class='page-link clickPageNumber' href='javascript:void(0);'>" +
      n +
      '</a></div>'
  document.addEventListener('click', function (e) {
    'A' == e.target.nodeName &&
      e.target.classList.contains('clickPageNumber') &&
      ((currentPage = e.target.textContent),
      loadJobListData(allJobList, currentPage))
  }),
    selectedPage()
}
getJSON('job-list.json', function (e, t) {
  null !== e
    ? console.log('Something went wrong: ' + e)
    : (loadJobListData((allJobList = t), currentPage),
      paginationEvents(),
      sortElementsById())
})
var tagInputField = new Choices('#taginput-choices', { removeItemButton: !0 })
function fetchIdFromObj(e) {
  return parseInt(e.id)
}
function findNextId() {
  var e, t
  return 0 === allJobList.length
    ? 0
    : (e = fetchIdFromObj(allJobList[allJobList.length - 1])) <=
      (t = fetchIdFromObj(allJobList[0]))
    ? t + 1
    : e + 1
}
function sortElementsById() {
  loadJobListData(
    allJobList.sort(function (e, t) {
      ;(e = fetchIdFromObj(e)), (t = fetchIdFromObj(t))
      return t < e ? -1 : e < t ? 1 : 0
    }),
    currentPage
  )
}
function jobDetailShow() {
  Array.from(document.querySelectorAll('#job-list .joblist-card')).forEach(
    function (s) {
      s.querySelector('.viewjob-list').addEventListener('click', function () {
        var e = s.querySelector('.cover-img').src,
          t = s.querySelector('.companyLogo-img').src,
          n = s.querySelector('.job-title').innerHTML,
          o = s.querySelector('.company-name').innerHTML,
          a = s.querySelector('.job-description').innerHTML,
          i = s.querySelector('.job-type').innerHTML,
          r = s.querySelector('.job-location').innerHTML,
          l = s.querySelector('.job-postdate').innerHTML,
          c = s.querySelector('.job-experience').innerHTML
        ;(document.querySelector('#cover-img').src = e),
          (document.querySelector('#job-overview .view-companylogo').src = t),
          (document.querySelector('#job-overview .view-title').innerHTML = n),
          (document.querySelector('#job-overview .view-companyname').innerHTML =
            o),
          (document.querySelector('#job-overview .view-location').innerHTML =
            r),
          (document.querySelector('#job-overview .view-desc').innerHTML = a),
          (document.querySelector('#job-overview .view-type').innerHTML = i),
          (document.querySelector('#job-overview .view-postdate').innerHTML =
            l),
          (document.querySelector('#job-overview .view-experience').innerHTML =
            c)
      })
    }
  )
}
document
  .querySelector('#companylogo-image-input')
  .addEventListener('change', function () {
    var e = document.querySelector('#companylogo-img'),
      t = document.querySelector('#companylogo-image-input').files[0],
      n = new FileReader()
    n.addEventListener(
      'load',
      function () {
        e.src = n.result
      },
      !1
    ),
      t && n.readAsDataURL(t)
  }),
  document
    .querySelector('#cover-image-input')
    .addEventListener('change', function () {
      var e = document.querySelector('#modal-cover-img'),
        t = document.querySelector('#cover-image-input').files[0],
        n = new FileReader()
      n.addEventListener(
        'load',
        function () {
          e.src = n.result
        },
        !1
      ),
        t && n.readAsDataURL(t)
    }),
  (function () {
    'use strict'
    var e = document.querySelectorAll('.needs-validation'),
      m = new Date().toUTCString().slice(5, 16)
    Array.prototype.slice.call(e).forEach(function (u) {
      u.addEventListener(
        'submit',
        function (e) {
          var t, n, o, a, i, r, l, c, s, d
          u.checkValidity()
            ? (e.preventDefault(),
              (t = document.getElementById('jobtitle-field').value),
              (n = document.getElementById('companyname-field').value),
              (o = document.getElementById('companylogo-img').src),
              (a = document.getElementById('modal-cover-img').src),
              (i = document.getElementById('job_type-field').value),
              (r = document.getElementById('experience-field').value),
              (l = document.getElementById('location-field').value),
              (c = document.getElementById('description-field').value),
              (s = tagInputField.getValue(!0)),
              '' === t ||
                '' === n ||
                '' === i ||
                '' === l ||
                editList ||
                ((d = findNextId()),
                allJobList.push({
                  id: d,
                  coverImg: a,
                  companyLogo: o,
                  jobTitle: t,
                  companyName: n,
                  description: c,
                  tags: s,
                  type: i,
                  experience: r,
                  location: l,
                  applied: '0 Applied',
                  postDate: m,
                }),
                sortElementsById()),
              loadJobListData(allJobList, currentPage),
              document.getElementById('close-jobListModal').click())
            : (e.preventDefault(), e.stopPropagation()),
            u.classList.add('was-validated')
        },
        !1
      )
    })
  })()
var searchElementList = document.getElementById('searchJob')
function clearFields() {
  ;(document.getElementById('companylogo-img').src =
    'assets/images/users/multi-user.jpg'),
    (document.getElementById('jobtitle-field').value = ''),
    (document.getElementById('companyname-field').value = ''),
    (document.getElementById('job_type-field').value = 'Full Time'),
    (document.getElementById('experience-field').value = ''),
    (document.getElementById('location-field').value = ''),
    (document.getElementById('Salary-field').value = ''),
    (document.getElementById('description-field').value = ''),
    tagInputField.removeActiveItems(),
    tagInputField.setChoiceByValue(''),
    document.getElementById('createjob-form').classList.remove('was-validated')
}
searchElementList.addEventListener('keyup', function () {
  var e = searchElementList.value.toLowerCase()
  t = e
  for (
    var t,
      n = allJobList.filter(function (e) {
        return (
          -1 !== e.jobTitle.toLowerCase().indexOf(t.toLowerCase()) ||
          -1 !== e.companyName.toLowerCase().indexOf(t.toLowerCase())
        )
      }),
      o =
        (0 < e.length
          ? document
              .getElementById('found-job-alert')
              .classList.remove('d-none')
          : document.getElementById('found-job-alert').classList.add('d-none'),
        0 == n.length
          ? (document.getElementById('pagination-element').style.display =
              'none')
          : (document.getElementById('pagination-element').style.display =
              'flex'),
        document.getElementById('page-num')),
      a = ((o.innerHTML = ''), Math.ceil(n.length / itemsPerPage)),
      i = 1;
    i < a + 1;
    i++
  )
    o.innerHTML +=
      "<div class='page-item'><a class='page-link clickPageNumber' href='javascript:void(0);'>" +
      i +
      '</a></div>'
  loadJobListData(n, currentPage)
}),
  document
    .getElementById('CreateJobModal')
    .addEventListener('hidden.bs.modal', (e) => {
      clearFields()
    })
