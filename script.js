const restaurants = [
  {
    name: "초심가든",
    category: "한식",
    menu: "한식뷔페",
    price: 10000,
    walk: "무안 청계면권",
    solo: true,
    mood: "든든한 점심, 가성비, 여러 반찬",
    desc: "다양한 반찬으로 한 끼를 든든하게 먹고 싶을 때 보기 좋은 한식뷔페 후보입니다.",
    mapQuery: "초심가든 무안 청계면 구암길 7-3"
  },
  {
    name: "해바라기",
    category: "한식",
    menu: "제육볶음, 철판볶음밥",
    price: 9000,
    walk: "목포대 주변권",
    solo: true,
    mood: "점심, 혼밥, 간단한 한 끼",
    desc: "수업 사이에 부담 없이 먹기 좋은 점심 메뉴 후보입니다.",
    mapQuery: "해바라기 무안 목포대 제육볶음"
  },
  {
    name: "고기짬뽕",
    category: "중식",
    menu: "짬뽕, 고기짬뽕",
    price: 10000,
    walk: "목포대 주변권",
    solo: true,
    mood: "해장, 매운 메뉴, 빠른 식사",
    desc: "국물 있는 중식 메뉴가 당길 때 넣어볼 만한 짬뽕 후보입니다.",
    mapQuery: "고기짬뽕 무안 목포대"
  },
  {
    name: "앨리스 커피",
    category: "카페",
    menu: "커피, 디저트",
    price: 8000,
    walk: "무안 청계면권",
    solo: true,
    mood: "카공, 디저트, 공강",
    desc: "커피와 디저트를 먹으면서 쉬거나 공부할 장소를 찾을 때 어울리는 후보입니다.",
    mapQuery: "앨리스 커피 무안 목포대"
  },
  {
    name: "장부식육식당",
    category: "고기",
    menu: "제육볶음, 돼지육회",
    price: 15000,
    walk: "무안 청계면권",
    solo: false,
    mood: "친구랑, 저녁, 현지인 맛집",
    desc: "혼자보다는 친구들과 함께 든든하게 먹기 좋은 고기 메뉴 후보입니다.",
    mapQuery: "장부식육식당 무안"
  },
  {
    name: "승달수산",
    category: "해산물",
    menu: "회, 우럭, 낙지초무침",
    price: 20000,
    walk: "무안 청계면권",
    solo: false,
    mood: "모임, 해산물, 저녁",
    desc: "해산물 메뉴를 먹고 싶거나 여럿이 식사할 때 확인해볼 수 있는 후보입니다.",
    mapQuery: "승달수산 무안 목포대"
  },
  {
    name: "신전떡볶이 목포대점",
    category: "분식",
    menu: "떡볶이, 튀김, 컵밥",
    price: 8000,
    walk: "목포대점",
    solo: true,
    mood: "분식, 배달, 간단식사",
    desc: "매운 분식이나 간단한 배달 메뉴가 필요할 때 빠르게 고르기 좋은 후보입니다.",
    mapQuery: "신전떡볶이 목포대점"
  },
  {
    name: "한솥도시락 무안",
    category: "도시락",
    menu: "도시락, 단체도시락",
    price: 7000,
    walk: "목포대 주변권",
    solo: true,
    mood: "혼밥, 저렴한 식사, 포장",
    desc: "가격 부담을 줄이고 빠르게 먹고 싶을 때 확인하기 좋은 도시락 후보입니다.",
    mapQuery: "한솥도시락 무안 목포대"
  },
  {
    name: "목대 브리또",
    category: "양식",
    menu: "브리또, 멕시코음식",
    price: 9000,
    walk: "목포대 주변권",
    solo: true,
    mood: "혼밥, 배달, 든든한 간식",
    desc: "밥 메뉴가 지겨울 때 간단하면서도 든든하게 먹기 좋은 후보입니다.",
    mapQuery: "목대 브리또 무안"
  },
  {
    name: "메가커피 목포대점",
    category: "카페",
    menu: "커피, 음료",
    price: 5000,
    walk: "목포대점",
    solo: true,
    mood: "카공, 테이크아웃, 공강",
    desc: "수업 전후로 음료를 빠르게 사거나 잠깐 쉬어가기 좋은 카페 후보입니다.",
    mapQuery: "메가커피 목포대점"
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
    link.href = `https://map.kakao.com/link/search/${encodeURIComponent(item.mapQuery)}`;
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
