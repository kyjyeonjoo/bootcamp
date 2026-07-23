const restaurants = [
  {
    name: "정문 김밥",
    category: "분식",
    menu: "김밥, 라면, 떡볶이",
    price: 7000,
    walk: "정문 기준 도보 5분",
    solo: true,
    mood: "공강 1시간, 빠른 점심, 혼밥",
    desc: "짧은 공강 시간에 가볍게 먹기 좋은 분식 후보입니다."
  },
  {
    name: "목대 백반집",
    category: "한식",
    menu: "백반, 제육, 된장찌개",
    price: 9000,
    walk: "정문 기준 도보 8분",
    solo: true,
    mood: "든든한 점심, 시험기간, 집밥 느낌",
    desc: "든든하게 한 끼 먹고 싶을 때 어울리는 한식 식당입니다."
  },
  {
    name: "캠퍼스 짜장",
    category: "중식",
    menu: "짜장면, 짬뽕, 탕수육",
    price: 10000,
    walk: "후문 기준 도보 7분",
    solo: true,
    mood: "빠른 저녁, 친구랑, 배달 후보",
    desc: "메뉴 선택이 쉬워 여러 명이 함께 가기 좋은 중식 후보입니다."
  },
  {
    name: "정문 고깃집",
    category: "고기",
    menu: "삼겹살, 목살, 김치찌개",
    price: 15000,
    walk: "정문 기준 도보 12분",
    solo: false,
    mood: "동기 모임, 저녁 약속, 회식",
    desc: "과제 끝난 날이나 동기들과 저녁을 먹을 때 넣기 좋은 후보입니다."
  },
  {
    name: "공강 카페",
    category: "카페",
    menu: "아메리카노, 샌드위치, 디저트",
    price: 8000,
    walk: "정문 기준 도보 6분",
    solo: true,
    mood: "공부, 노트북, 간단한 식사",
    desc: "식사와 공부를 같이 해결하고 싶을 때 어울리는 카페형 장소입니다."
  },
  {
    name: "국밥 한그릇",
    category: "한식",
    menu: "돼지국밥, 순대국밥",
    price: 9500,
    walk: "기숙사 기준 도보 10분",
    solo: true,
    mood: "비 오는 날, 든든한 저녁, 혼밥",
    desc: "날씨가 흐리거나 든든한 국물 메뉴가 필요할 때 추천할 만한 후보입니다."
  }
];

const list = document.querySelector("#restaurantList");
const template = document.querySelector("#cardTemplate");
const searchInput = document.querySelector("#searchInput");
const categoryFilter = document.querySelector("#categoryFilter");
const priceFilter = document.querySelector("#priceFilter");
const soloFilter = document.querySelector("#soloFilter");
const countStat = document.querySelector("#countStat");
const todayPick = document.querySelector("#todayPick");
const randomBtn = document.querySelector("#randomBtn");

function render() {
  const query = searchInput.value.trim().toLowerCase();
  const category = categoryFilter.value;
  const price = priceFilter.value;

  const filtered = restaurants.filter((item) => {
    const haystack = `${item.name} ${item.menu} ${item.mood} ${item.category}`.toLowerCase();
    const matchesQuery = !query || haystack.includes(query);
    const matchesCategory = category === "all" || item.category === category;
    const matchesPrice = price === "all" || item.price <= Number(price);
    const matchesSolo = !soloFilter.checked || item.solo;
    return matchesQuery && matchesCategory && matchesPrice && matchesSolo;
  });

  list.innerHTML = "";
  countStat.textContent = filtered.length;

  filtered.forEach((item) => {
    const card = template.content.cloneNode(true);
    card.querySelector(".tag").textContent = item.category;
    card.querySelector("h3").textContent = item.name;
    card.querySelector(".price").textContent = `${item.price.toLocaleString()}원대`;
    card.querySelector(".menu").textContent = item.menu;
    card.querySelector(".desc").textContent = item.desc;
    card.querySelector(".meta").innerHTML = `
      <span>${item.walk}</span>
      <span>${item.solo ? "혼밥 가능" : "여럿이 추천"}</span>
      <span>${item.mood.split(",")[0]}</span>
    `;
    const link = card.querySelector(".map");
    link.href = `https://map.naver.com/p/search/${encodeURIComponent(`목포대학교 ${item.name}`)}`;
    list.appendChild(card);
  });
}

function pickRandom() {
  const item = restaurants[Math.floor(Math.random() * restaurants.length)];
  todayPick.innerHTML = `
    <span>오늘의 추천</span>
    <h2>${item.name}</h2>
    <p>${item.menu} · ${item.walk}<br>${item.mood}</p>
  `;
}

[searchInput, categoryFilter, priceFilter, soloFilter].forEach((control) => {
  control.addEventListener("input", render);
});

randomBtn.addEventListener("click", pickRandom);
pickRandom();
render();
