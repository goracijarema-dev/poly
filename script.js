const storageKeys = {
  users: "polunychka.users",
  session: "polunychka.session",
  listings: "polunychka.listings",
  version: "polunychka.version"
};

const appDataVersion = "2026-07-01-tariffs-v3";

const priceOptions = [
  { key: "min30", field: "listingPrice30", label: "30 хв" },
  { key: "hour1", field: "listingPriceHour", label: "1 година" },
  { key: "hour2", field: "listingPrice2h", label: "2 години" },
  { key: "hour5", field: "listingPrice5h", label: "5 годин" },
  { key: "night", field: "listingPriceNight", label: "Ніч" }
];

const ukrainianCities = [
  "Київ",
  "Харків",
  "Одеса",
  "Дніпро",
  "Донецьк",
  "Запоріжжя",
  "Львів",
  "Кривий Ріг",
  "Миколаїв",
  "Маріуполь",
  "Луганськ",
  "Вінниця",
  "Макіївка",
  "Севастополь",
  "Сімферополь",
  "Херсон",
  "Полтава",
  "Чернігів",
  "Черкаси",
  "Хмельницький",
  "Чернівці",
  "Житомир",
  "Суми",
  "Рівне",
  "Івано-Франківськ",
  "Кропивницький",
  "Тернопіль",
  "Луцьк",
  "Ужгород",
  "Біла Церква",
  "Кременчук",
  "Кам'янське",
  "Краматорськ",
  "Мелітополь",
  "Керч",
  "Нікополь",
  "Слов'янськ",
  "Бердянськ",
  "Умань",
  "Бровари",
  "Павлоград",
  "Сєвєродонецьк",
  "Кам'янець-Подільський",
  "Мукачево",
  "Олександрія",
  "Дрогобич",
  "Ніжин",
  "Конотоп",
  "Шостка",
  "Бориспіль",
  "Ірпінь",
  "Буча",
  "Вишневе",
  "Вишгород",
  "Обухів",
  "Фастів",
  "Васильків",
  "Боярка",
  "Чорноморськ",
  "Білгород-Дністровський",
  "Ізмаїл",
  "Подільськ",
  "Южне",
  "Роздільна",
  "Рені",
  "Болград",
  "Коломия",
  "Калуш",
  "Яремче",
  "Надвірна",
  "Долина",
  "Мукачево",
  "Хуст",
  "Берегове",
  "Виноградів",
  "Тячів",
  "Свалява",
  "Чоп",
  "Стрий",
  "Червоноград",
  "Самбір",
  "Борислав",
  "Трускавець",
  "Дубляни",
  "Новояворівськ",
  "Винники",
  "Моршин",
  "Дубно",
  "Вараш",
  "Костопіль",
  "Сарни",
  "Здолбунів",
  "Острог",
  "Ковель",
  "Володимир",
  "Нововолинськ",
  "Володимир-Волинський",
  "Камінь-Каширський",
  "Шепетівка",
  "Кам'янець-Подільський",
  "Старокостянтинів",
  "Нетішин",
  "Славута",
  "Дунаївці",
  "Могилів-Подільський",
  "Жмеринка",
  "Ладижин",
  "Хмільник",
  "Козятин",
  "Гайсин",
  "Умань",
  "Сміла",
  "Золотоноша",
  "Канів",
  "Корсунь-Шевченківський",
  "Звенигородка",
  "Шпола",
  "Прилуки",
  "Ніжин",
  "Бахмач",
  "Новгород-Сіверський",
  "Конотоп",
  "Охтирка",
  "Ромни",
  "Глухів",
  "Лебедин",
  "Кременчук",
  "Горішні Плавні",
  "Лубни",
  "Миргород",
  "Пирятин",
  "Олександрія",
  "Світловодськ",
  "Знам'янка",
  "Новоукраїнка",
  "Кривий Ріг",
  "Нікополь",
  "Павлоград",
  "Новомосковськ",
  "Самар",
  "Синельникове",
  "Марганець",
  "Покров",
  "Жовті Води",
  "Кам'янське",
  "Запоріжжя",
  "Бердянськ",
  "Мелітополь",
  "Енергодар",
  "Токмак",
  "Дніпрорудне",
  "Херсон",
  "Нова Каховка",
  "Каховка",
  "Скадовськ",
  "Генічеськ",
  "Берислав",
  "Миколаїв",
  "Первомайськ",
  "Вознесенськ",
  "Южноукраїнськ",
  "Очаків",
  "Баштанка",
  "Краматорськ",
  "Слов'янськ",
  "Бахмут",
  "Покровськ",
  "Костянтинівка",
  "Дружківка",
  "Маріуполь",
  "Курахове",
  "Мирноград",
  "Добропілля",
  "Волноваха",
  "Лиман",
  "Авдіївка",
  "Луганськ",
  "Сєвєродонецьк",
  "Лисичанськ",
  "Рубіжне",
  "Алчевськ",
  "Кадіївка",
  "Хрустальний",
  "Довжанськ",
  "Сватове",
  "Старобільськ",
  "Харків",
  "Лозова",
  "Ізюм",
  "Чугуїв",
  "Куп'янськ",
  "Мерефа",
  "Люботин",
  "Балаклія",
  "Богодухів",
  "Вовчанськ",
  "Ялта",
  "Євпаторія",
  "Феодосія",
  "Алушта",
  "Судак",
  "Керч",
  "Бахчисарай",
  "Джанкой",
  "Саки"
].filter((city, index, cities) => cities.indexOf(city) === index);

const seedListings = [
  {
    id: "seed-1",
    ownerEmail: "demo@polunychka.ua",
    name: "Марія",
    gender: "Жінка",
    age: 24,
    height: 168,
    weight: 54,
    bust: "B",
    price: 900,
    priceOptions: { min30: 550, hour1: 900, hour2: 1600, night: 6200 },
    city: "Київ",
    phone: "+380 67 111 22 33",
    description: "Індивідуальні послуги для подій, зустрічей і приватних запитів. Працюю за попередньою домовленістю.",
    photos: ["assets/hero-beach.jpg"]
  },
  {
    id: "seed-2",
    ownerEmail: "demo@polunychka.ua",
    name: "Анна",
    gender: "Жінка",
    age: 29,
    height: 172,
    weight: 59,
    bust: "C",
    price: 1200,
    priceOptions: { min30: 700, hour1: 1200, hour2: 2200, hour5: 5000, night: 8500 },
    city: "Львів",
    phone: "+380 68 222 33 44",
    description: "Охайна анкета з прозорими умовами, погодинною оплатою та швидкою відповіддю на заявки.",
    photos: ["assets/hero-beach.jpg"]
  },
  {
    id: "seed-3",
    ownerEmail: "demo@polunychka.ua",
    name: "Олена",
    gender: "Жінка",
    age: 26,
    height: 165,
    weight: 52,
    bust: "2",
    price: 800,
    priceOptions: { hour1: 800, hour2: 1450, hour5: 3400 },
    city: "Одеса",
    phone: "+380 63 333 44 55",
    description: "Доступна для персональних послуг у місті. Деталі, графік і формат обговорюються окремо.",
    photos: ["assets/hero-beach.jpg"]
  }
];

const state = {
  authMode: "register",
  editingListingId: null,
  pendingCreate: false,
  photosProcessing: false,
  selectedPhotos: []
};

const selectors = {
  authModal: document.querySelector("#authModal"),
  listingModal: document.querySelector("#listingModal"),
  authForm: document.querySelector("#authForm"),
  listingForm: document.querySelector("#listingForm"),
  listingModalTitle: document.querySelector("#listingModalTitle"),
  listingSubmit: document.querySelector("#listingSubmit"),
  authTitle: document.querySelector("#authTitle"),
  authModeLabel: document.querySelector("#authModeLabel"),
  authSubmit: document.querySelector("#authSubmit"),
  toggleAuthMode: document.querySelector("#toggleAuthMode"),
  nameField: document.querySelector("#nameField"),
  authName: document.querySelector("#authName"),
  authEmail: document.querySelector("#authEmail"),
  authPassword: document.querySelector("#authPassword"),
  authError: document.querySelector("#authError"),
  listingError: document.querySelector("#listingError"),
  photoInput: document.querySelector("#listingPhotos"),
  photoPreview: document.querySelector("#photoPreview"),
  cardsGrid: document.querySelector("#cardsGrid"),
  cardTemplate: document.querySelector("#cardTemplate"),
  emptyState: document.querySelector("#emptyState"),
  resultsCount: document.querySelector("#resultsCount"),
  heroListingsCount: document.querySelector("#heroListingsCount"),
  guestPanel: document.querySelector("#guestPanel"),
  userPanel: document.querySelector("#userPanel"),
  profileInitial: document.querySelector("#profileInitial"),
  profileName: document.querySelector("#profileName"),
  profileEmail: document.querySelector("#profileEmail"),
  searchInput: document.querySelector("#searchInput"),
  cityFilter: document.querySelector("#cityFilter"),
  genderFilter: document.querySelector("#genderFilter"),
  priceMinFilter: document.querySelector("#priceMinFilter"),
  priceMaxFilter: document.querySelector("#priceMaxFilter"),
  ageMinFilter: document.querySelector("#ageMinFilter"),
  ageMaxFilter: document.querySelector("#ageMaxFilter"),
  heightMinFilter: document.querySelector("#heightMinFilter"),
  bustFilter: document.querySelector("#bustFilter"),
  resetFilters: document.querySelector("#resetFilters"),
  cityList: document.querySelector("#ukrainianCities"),
  createButtons: [
    document.querySelector("#openCreateTop"),
    document.querySelector("#openCreateHero"),
    document.querySelector("#openCreatePanel"),
    document.querySelector("#emptyCreateButton"),
    document.querySelector("#openCreateMobile")
  ]
};

function getStored(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function setStored(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getUsers() {
  return getStored(storageKeys.users, []);
}

function getSession() {
  return getStored(storageKeys.session, null);
}

function getListings() {
  const stored = getStored(storageKeys.listings, null);
  return (stored || seedListings).map(normalizeListing);
}

function setListings(listings) {
  setStored(storageKeys.listings, listings);
}

function saveListingsSafely(listings) {
  try {
    setListings(listings);
    return true;
  } catch {
    selectors.listingError.textContent = "Не вдалося зберегти анкету. Спробуй додати менші фото.";
    return false;
  }
}

function createListingId() {
  return globalThis.crypto?.randomUUID ? globalThis.crypto.randomUUID() : String(Date.now());
}

function normalizePriceOptions(listing) {
  const normalized = {};

  priceOptions.forEach((option) => {
    const value = Number(listing.priceOptions?.[option.key]);
    if (Number.isFinite(value) && value > 0) {
      normalized[option.key] = value;
    }
  });

  if (!Object.keys(normalized).length) {
    const legacyPrice = Number(listing.price);
    if (Number.isFinite(legacyPrice) && legacyPrice > 0) {
      normalized.hour1 = legacyPrice;
    }
  }

  return normalized;
}

function getPriceValues(listing) {
  return Object.values(normalizePriceOptions(listing));
}

function getLowestPrice(listing) {
  const prices = getPriceValues(listing);
  return prices.length ? Math.min(...prices) : 0;
}

function getPrimaryPrice(priceMap) {
  const values = Object.values(priceMap);
  if (!values.length) return 0;
  return Number(priceMap.hour1) || Math.min(...values);
}

function formatCurrency(value) {
  return Number(value).toLocaleString("uk-UA");
}

function formatPriceSummary(listing) {
  const lowest = getLowestPrice(listing);
  return lowest ? `від ${formatCurrency(lowest)} грн` : "Ціну не вказано";
}

function normalizeListing(listing) {
  const seed = seedListings.find((item) => item.id === listing.id);
  const merged = {
    ...seed,
    ...listing
  };
  const normalizedPrices = normalizePriceOptions(merged);

  return {
    ...merged,
    price: getPrimaryPrice(normalizedPrices) || Number(merged.price) || 0,
    priceOptions: normalizedPrices,
    phone: merged.phone || seed?.phone || "",
    photos: merged.photos?.length ? merged.photos : seed?.photos || []
  };
}

function migrateStoredListings() {
  const currentVersion = localStorage.getItem(storageKeys.version);
  const stored = getStored(storageKeys.listings, null);

  if (currentVersion !== appDataVersion && Array.isArray(stored)) {
    const existingIds = new Set(stored.map((listing) => listing.id));
    const missingSeeds = seedListings.filter((seed) => !existingIds.has(seed.id));
    const normalizedStored = stored.map(normalizeListing);
    setListings([...missingSeeds, ...normalizedStored]);
  }

  localStorage.setItem(storageKeys.version, appDataVersion);
}

function getCurrentUser() {
  const session = getSession();
  if (!session) return null;
  return getUsers().find((user) => user.email === session.email) || null;
}

function openModal(modal) {
  if (typeof modal.showModal === "function") {
    modal.showModal();
  } else {
    modal.setAttribute("open", "");
  }
}

function closeModal(modal) {
  modal.close();
}

function getListingField(id) {
  return document.querySelector(`#${id}`);
}

function setListingMode(mode) {
  const isEdit = mode === "edit";
  selectors.listingModalTitle.textContent = isEdit ? "Редагувати анкету" : "Розмістити послуги";
  selectors.listingSubmit.textContent = isEdit ? "Зберегти зміни" : "Опублікувати";
  selectors.photoInput.required = !isEdit;
}

function setPhotoProcessing(isProcessing) {
  state.photosProcessing = isProcessing;
  selectors.listingSubmit.disabled = isProcessing;
  if (isProcessing) {
    selectors.listingSubmit.textContent = "Обробка фото...";
    return;
  }

  setListingMode(state.editingListingId ? "edit" : "create");
}

function setAuthMode(mode) {
  state.authMode = mode;
  const isRegister = mode === "register";
  selectors.authTitle.textContent = isRegister ? "Створити кабінет" : "Увійти в кабінет";
  selectors.authModeLabel.textContent = isRegister ? "Реєстрація" : "Вхід";
  selectors.authSubmit.textContent = isRegister ? "Зареєструватися" : "Увійти";
  selectors.toggleAuthMode.textContent = isRegister ? "У мене вже є кабінет" : "Створити новий кабінет";
  selectors.nameField.classList.toggle("is-hidden", !isRegister);
  selectors.authName.required = isRegister;
  selectors.authError.textContent = "";
}

function requireAccountThenCreate() {
  if (!getCurrentUser()) {
    state.pendingCreate = true;
    setAuthMode("register");
    selectors.authError.textContent = "Щоб розмістити послуги, спочатку створи кабінет або увійди.";
    openModal(selectors.authModal);
    return;
  }
  resetListingForm("create");
  openModal(selectors.listingModal);
}

function handleAuth(event) {
  event.preventDefault();
  const users = getUsers();
  const name = selectors.authName.value.trim();
  const email = selectors.authEmail.value.trim().toLowerCase();
  const password = selectors.authPassword.value;

  selectors.authError.textContent = "";

  if (state.authMode === "register") {
    if (users.some((user) => user.email === email)) {
      selectors.authError.textContent = "Кабінет із цією поштою вже існує.";
      return;
    }

    const user = { name, email, password };
    setStored(storageKeys.users, [...users, user]);
    setStored(storageKeys.session, { email });
  } else {
    const user = users.find((item) => item.email === email && item.password === password);
    if (!user) {
      selectors.authError.textContent = "Невірна пошта або пароль.";
      return;
    }
    setStored(storageKeys.session, { email });
  }

  selectors.authForm.reset();
  closeModal(selectors.authModal);
  render();

  if (state.pendingCreate) {
    state.pendingCreate = false;
    resetListingForm("create");
    openModal(selectors.listingModal);
  }
}

function readFilesAsDataUrls(files) {
  return Promise.all(files.map(compressImageFile));
}

function compressImageFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    const image = new Image();

    reader.onerror = reject;
    image.onerror = reject;

    reader.onload = () => {
      image.src = reader.result;
    };

    image.onload = () => {
      const maxSide = 1280;
      const scale = Math.min(1, maxSide / Math.max(image.width, image.height));
      const width = Math.max(1, Math.round(image.width * scale));
      const height = Math.max(1, Math.round(image.height * scale));
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      canvas.width = width;
      canvas.height = height;
      context.drawImage(image, 0, 0, width, height);
      resolve(canvas.toDataURL("image/jpeg", 0.82));
    };

    reader.readAsDataURL(file);
  });
}

function renderPhotoPreview() {
  selectors.photoPreview.innerHTML = "";
  state.selectedPhotos.forEach((photo) => {
    const image = document.createElement("img");
    image.src = photo;
    image.alt = "Фото анкети";
    selectors.photoPreview.append(image);
  });
}

async function handlePhotoChange(event) {
  const files = Array.from(event.target.files || []);
  selectors.listingError.textContent = "";

  if (files.length > 8) {
    selectors.listingError.textContent = "Можна додати максимум 8 фото.";
    selectors.photoInput.value = "";
    state.selectedPhotos = [];
    renderPhotoPreview();
    return;
  }

  if (files.some((file) => !file.type.startsWith("image/"))) {
    selectors.listingError.textContent = "Можна додавати тільки зображення.";
    selectors.photoInput.value = "";
    state.selectedPhotos = [];
    renderPhotoPreview();
    return;
  }

  try {
    setPhotoProcessing(true);
    state.selectedPhotos = await readFilesAsDataUrls(files);
    renderPhotoPreview();
  } catch {
    selectors.listingError.textContent = "Не вдалося обробити фото. Спробуй інший файл.";
    selectors.photoInput.value = "";
    state.selectedPhotos = [];
    renderPhotoPreview();
  } finally {
    setPhotoProcessing(false);
  }
}

function resetListingForm(mode = "create") {
  selectors.listingForm.reset();
  selectors.listingError.textContent = "";
  state.editingListingId = null;
  state.selectedPhotos = [];
  setListingMode(mode);
  renderPhotoPreview();

  const user = getCurrentUser();
  if (user) {
    getListingField("listingName").value = user.name;
  }
}

function fillListingForm(listing) {
  selectors.listingForm.reset();
  selectors.listingError.textContent = "";
  state.editingListingId = listing.id;
  state.selectedPhotos = [...(listing.photos || [])];
  setListingMode("edit");

  getListingField("listingName").value = listing.name || "";
  getListingField("listingGender").value = listing.gender || "";
  getListingField("listingAge").value = listing.age || "";
  getListingField("listingHeight").value = listing.height || "";
  getListingField("listingWeight").value = listing.weight || "";
  getListingField("listingBust").value = listing.bust || "";
  getListingField("listingCity").value = listing.city || "";
  getListingField("listingPhone").value = listing.phone || "";
  getListingField("listingDescription").value = listing.description || "";
  priceOptions.forEach((option) => {
    getListingField(option.field).value = listing.priceOptions?.[option.key] || "";
  });
  renderPhotoPreview();
}

function collectPriceOptions() {
  return priceOptions.reduce((prices, option) => {
    const value = Number(getListingField(option.field).value);
    if (Number.isFinite(value) && value > 0) {
      prices[option.key] = value;
    }
    return prices;
  }, {});
}

function collectListingData(user) {
  const priceMap = collectPriceOptions();

  return {
    ownerEmail: user.email,
    name: getListingField("listingName").value.trim(),
    gender: getListingField("listingGender").value,
    age: Number(getListingField("listingAge").value),
    height: Number(getListingField("listingHeight").value),
    weight: Number(getListingField("listingWeight").value),
    bust: getListingField("listingBust").value.trim(),
    price: getPrimaryPrice(priceMap),
    priceOptions: priceMap,
    city: getListingField("listingCity").value.trim(),
    phone: getListingField("listingPhone").value.trim(),
    description: getListingField("listingDescription").value.trim(),
    photos: [...state.selectedPhotos]
  };
}

function handleListingSubmit(event) {
  event.preventDefault();
  const user = getCurrentUser();
  if (!user) {
    selectors.listingError.textContent = "Спочатку створи кабінет або увійди.";
    return;
  }

  if (state.photosProcessing) {
    selectors.listingError.textContent = "Дочекайся завершення обробки фото.";
    return;
  }

  if (state.selectedPhotos.length < 1 || state.selectedPhotos.length > 8) {
    selectors.listingError.textContent = "Додай від 1 до 8 фото.";
    return;
  }

  if (!Object.keys(collectPriceOptions()).length) {
    selectors.listingError.textContent = "Вкажи хоча б один тариф: 30 хв, 1 година, 2 години, 5 годин або ніч.";
    return;
  }

  const listings = getListings();
  const listingData = collectListingData(user);

  if (state.editingListingId) {
    const current = listings.find((item) => item.id === state.editingListingId);
    if (!current || current.ownerEmail !== user.email) {
      selectors.listingError.textContent = "Можна редагувати тільки власну анкету.";
      return;
    }

    const saved = saveListingsSafely(
      listings.map((item) =>
        item.id === state.editingListingId
          ? { ...item, ...listingData, id: item.id, ownerEmail: item.ownerEmail }
          : item
      )
    );
    if (!saved) return;
  } else {
    const listing = {
      id: createListingId(),
      ...listingData
    };
    const saved = saveListingsSafely([listing, ...listings]);
    if (!saved) return;
  }

  closeModal(selectors.listingModal);
  resetListingForm("create");
  render();
  document.querySelector("#catalog").scrollIntoView({ behavior: "smooth" });
}

function makeMetric(label) {
  const item = document.createElement("span");
  item.textContent = label;
  return item;
}

function renderPriceList(container, listing) {
  container.innerHTML = "";
  const prices = normalizePriceOptions(listing);

  priceOptions.forEach((option) => {
    if (!prices[option.key]) return;
    const item = document.createElement("span");
    item.innerHTML = `<b>${option.label}</b>${formatCurrency(prices[option.key])} грн`;
    container.append(item);
  });
}

function initCardTilt() {
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!canHover || reduceMotion) return;

  selectors.cardsGrid.querySelectorAll(".profile-card").forEach((card) => {
    if (card.dataset.tiltReady === "true") return;
    card.dataset.tiltReady = "true";

    card.addEventListener("pointermove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.setProperty("--tilt-x", `${(-y * 5).toFixed(2)}deg`);
      card.style.setProperty("--tilt-y", `${(x * 6).toFixed(2)}deg`);
    });

    card.addEventListener("pointerleave", () => {
      card.style.setProperty("--tilt-x", "0deg");
      card.style.setProperty("--tilt-y", "0deg");
    });
  });
}

function matchesFilters(listing) {
  const search = selectors.searchInput.value.trim().toLowerCase();
  const city = selectors.cityFilter.value;
  const gender = selectors.genderFilter.value;
  const priceMin = Number(selectors.priceMinFilter.value) || 0;
  const priceMax = Number(selectors.priceMaxFilter.value) || Infinity;
  const ageMin = Number(selectors.ageMinFilter.value) || 18;
  const ageMax = Number(selectors.ageMaxFilter.value) || Infinity;
  const heightMin = Number(selectors.heightMinFilter.value) || 0;
  const bust = selectors.bustFilter.value.trim().toLowerCase();
  const searchable = `${listing.name} ${listing.city} ${listing.description}`.toLowerCase();
  const listingBust = String(listing.bust).toLowerCase();
  const prices = getPriceValues(listing);
  const priceMatches = prices.some((price) => price >= priceMin && price <= priceMax);

  return (
    (!search || searchable.includes(search)) &&
    (!city || listing.city === city) &&
    (!gender || listing.gender === gender) &&
    priceMatches &&
    Number(listing.age) >= ageMin &&
    Number(listing.age) <= ageMax &&
    Number(listing.height) >= heightMin &&
    (!bust || listingBust.includes(bust))
  );
}

function renderCards() {
  const user = getCurrentUser();
  const listings = getListings();
  const visible = listings.filter(matchesFilters);
  selectors.cardsGrid.innerHTML = "";
  selectors.heroListingsCount.textContent = listings.length;
  selectors.resultsCount.textContent = formatListingsCount(visible.length);
  selectors.emptyState.classList.toggle("is-hidden", visible.length > 0);

  visible.forEach((listing, index) => {
    const node = selectors.cardTemplate.content.firstElementChild.cloneNode(true);
    const photo = node.querySelector(".card-photo");
    const title = node.querySelector("h3");
    const price = node.querySelector(".card-topline strong");
    const city = node.querySelector(".card-city");
    const metrics = node.querySelector(".metrics");
    const priceList = node.querySelector(".price-list");
    const phone = node.querySelector(".card-phone");
    const description = node.querySelector(".card-description");
    const owner = node.querySelector(".owner-badge");
    const editButton = node.querySelector(".edit-card");
    const deleteButton = node.querySelector(".delete-card");

    title.textContent = `${listing.name}, ${listing.age}`;
    node.style.setProperty("--float-delay", `${(index % 6) * -0.74}s`);
    price.textContent = formatPriceSummary(listing);
    city.textContent = listing.city;
    phone.textContent = listing.phone ? `Телефон: ${listing.phone}` : "Телефон не додано";
    if (listing.phone) {
      phone.href = `tel:${listing.phone.replace(/[^\d+]/g, "")}`;
    } else {
      phone.removeAttribute("href");
    }
    description.textContent = listing.description;
    owner.textContent = listing.ownerEmail === "demo@polunychka.ua" ? "Приклад" : "Моя анкета";

    if (listing.photos?.[0]) {
      const image = document.createElement("img");
      image.src = listing.photos[0];
      image.alt = `Фото анкети ${listing.name}`;
      photo.append(image);
    }

    [
      listing.gender,
      `${listing.height} см`,
      `${listing.weight} кг`,
      `Бюст ${listing.bust}`
    ].forEach((metric) => metrics.append(makeMetric(metric)));
    renderPriceList(priceList, listing);

    if (user && listing.ownerEmail === user.email) {
      node.classList.add("can-manage");
      editButton.addEventListener("click", () => {
        fillListingForm(listing);
        openModal(selectors.listingModal);
      });
      deleteButton.addEventListener("click", () => {
        if (deleteButton.dataset.confirming === "true") {
          setListings(getListings().filter((item) => item.id !== listing.id));
          render();
          return;
        }

        deleteButton.dataset.confirming = "true";
        deleteButton.textContent = "Точно?";
        deleteButton.classList.add("confirming");
        window.setTimeout(() => {
          deleteButton.dataset.confirming = "false";
          deleteButton.textContent = "Видалити";
          deleteButton.classList.remove("confirming");
        }, 2600);
      });
    }

    selectors.cardsGrid.append(node);
  });

  initCardTilt();
}

function renderAccount() {
  const user = getCurrentUser();
  selectors.guestPanel.classList.toggle("is-hidden", Boolean(user));
  selectors.userPanel.classList.toggle("is-hidden", !user);
  selectors.createButtons.filter(Boolean).forEach((button) => {
    button.classList.toggle("requires-login", !user);
    button.disabled = !user;
    button.setAttribute("aria-disabled", user ? "false" : "true");
    if (!user && button.id !== "openCreatePanel") {
      button.title = "Спочатку створи кабінет або увійди";
    } else {
      button.removeAttribute("title");
    }
  });

  if (user) {
    selectors.profileName.textContent = user.name;
    selectors.profileEmail.textContent = user.email;
    selectors.profileInitial.textContent = user.name.charAt(0).toUpperCase();
  }
}

function render() {
  populateCities();
  renderAccount();
  renderCards();
}

function populateCities() {
  const selectedCity = selectors.cityFilter.value;
  const listingCities = getListings()
    .map((listing) => listing.city)
    .filter(Boolean);
  const cities = [...new Set([...ukrainianCities, ...listingCities])].sort((a, b) =>
    a.localeCompare(b, "uk")
  );

  selectors.cityFilter.innerHTML = '<option value="">Усі міста</option>';
  selectors.cityList.innerHTML = "";
  cities.forEach((city) => {
    const filterOption = document.createElement("option");
    filterOption.value = city;
    filterOption.textContent = city;
    selectors.cityFilter.append(filterOption);

    const dataOption = document.createElement("option");
    dataOption.value = city;
    selectors.cityList.append(dataOption);
  });

  if (cities.includes(selectedCity)) {
    selectors.cityFilter.value = selectedCity;
  }
}

function formatListingsCount(count) {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  if (lastDigit === 1 && lastTwoDigits !== 11) {
    return `${count} анкета`;
  }

  if ([2, 3, 4].includes(lastDigit) && ![12, 13, 14].includes(lastTwoDigits)) {
    return `${count} анкети`;
  }

  return `${count} анкет`;
}

function resetFilters() {
  [
    selectors.searchInput,
    selectors.cityFilter,
    selectors.genderFilter,
    selectors.priceMinFilter,
    selectors.priceMaxFilter,
    selectors.ageMinFilter,
    selectors.ageMaxFilter,
    selectors.heightMinFilter,
    selectors.bustFilter
  ].forEach((control) => {
    control.value = "";
  });
  renderCards();
}

document.querySelectorAll("[data-close]").forEach((button) => {
  button.addEventListener("click", () => closeModal(document.querySelector(`#${button.dataset.close}`)));
});

document.querySelector("#openRegisterHero").addEventListener("click", () => {
  setAuthMode("register");
  openModal(selectors.authModal);
});

document.querySelector("#openRegisterPanel").addEventListener("click", () => {
  setAuthMode("register");
  openModal(selectors.authModal);
});

document.querySelector("#openLoginPanel").addEventListener("click", () => {
  setAuthMode("login");
  openModal(selectors.authModal);
});

document.querySelector("#cabinetLink").addEventListener("click", () => {
  document.querySelector("#cabinet").scrollIntoView({ behavior: "smooth" });
});

document.querySelector("#cabinetLinkMobile").addEventListener("click", () => {
  document.querySelector("#cabinet").scrollIntoView({ behavior: "smooth" });
});

["#openCreateTop", "#openCreateHero", "#openCreatePanel", "#emptyCreateButton", "#openCreateMobile"].forEach((selector) => {
  document.querySelector(selector).addEventListener("click", requireAccountThenCreate);
});

selectors.toggleAuthMode.addEventListener("click", () => {
  setAuthMode(state.authMode === "register" ? "login" : "register");
});

selectors.authForm.addEventListener("submit", handleAuth);
selectors.listingForm.addEventListener("submit", handleListingSubmit);
selectors.photoInput.addEventListener("change", handlePhotoChange);
[
  selectors.searchInput,
  selectors.cityFilter,
  selectors.genderFilter,
  selectors.priceMinFilter,
  selectors.priceMaxFilter,
  selectors.ageMinFilter,
  selectors.ageMaxFilter,
  selectors.heightMinFilter,
  selectors.bustFilter
].forEach((control) => {
  control.addEventListener("input", renderCards);
  control.addEventListener("change", renderCards);
});
selectors.resetFilters.addEventListener("click", resetFilters);

document.querySelector("#logoutButton").addEventListener("click", () => {
  localStorage.removeItem(storageKeys.session);
  render();
});

setAuthMode("register");
migrateStoredListings();
render();
