document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const menuButton = document.querySelector('.js-menu-button');
  const navLinks = document.querySelectorAll('.nav a');
  const header = document.querySelector('.js-header');
  const storyDialog = document.querySelector('.js-story-dialog');
  const storyClose = document.querySelector('.js-story-close');
  const storyLink = document.querySelector('.js-story-link');
  const storyTriggers = document.querySelectorAll('.js-category-trigger');
  let lastStoryTrigger = null;

  const stories = {
    tableware: {
      kicker: 'I / TABLEWARE', title: '美器', english: 'Tableware',
      lead: '何気ない食卓が、ちょっと特別になる。',
      body: [
        '食事は、生きていくうえで欠かせない毎日の時間。\nお気に入りのうつわがあるだけで、盛り付けが楽しくなり、いつものお惣菜さえ少し特別に見えます。',
        'マルミツポテリのうつわには、\n一つひとつに名前と物語があり、\n使い心地の良さや美しさ、そこに込められた想いに惹かれ、Remindはこのうつわを選びました。',
        '今日は、どのうつわにしよう。\nそんな小さな楽しみを、毎日の食卓へ。'
      ],
      main: { src: 'images/story_tableware_1.jpg', alt: '店内に並ぶRemindのうつわ' },
      sub: { src: 'images/story_tableware_2.jpg', alt: 'テーブルに並ぶうつわ' }
    },
    taste: {
      kicker: 'II / TASTE', title: '美味', english: 'Taste',
      lead: 'からだ想いの、美味しい時間。',
      body: [
        'からだに良いものを選ぶことは、昔から大切にしてきました。でも心を動かされたのは、「えっ、からだにいいのに、こんなに美味しい。」という驚きでした。',
        '素材へのこだわりや製法、生産者の想い。\n知るほどに、誰かにもすすめたくなる。',
        'Remindには、私自身が味わい、心から「美味しい」と思えたものを並べています。',
        'からだを想うことが、我慢ではなく、楽しみになるように。'
      ],
      main: { src: 'images/story_taste_1.jpg', alt: '店内に並ぶからだ想いの食品' },
      sub: { src: 'images/story_taste_2.jpg', alt: 'リボンで包まれた食品のギフト' }
    },
    beauty: {
      kicker: 'III / BEAUTY', title: '美肌', english: 'Beauty',
      lead: '肌も、心も、ときめく美容。',
      body: [
        '一日一日、年齢を重ねていくことは止められません。\nでも、少しだけあらがうことはできる。',
        '使うたびに、「これ、すごい。」と思わず笑顔になる。そんな小さな感動は、肌だけでなく、心まで前向きにしてくれます。',
        '鏡を見る時間が、昨日より少し楽しみになるように。'
      ],
      main: { src: 'images/story_beauty_1.jpg', alt: '店内に並ぶ美容アイテム' },
      sub: { src: 'images/story_beauty_2.jpg', alt: '美容アイテムが並ぶ店内' }
    },
    art: {
      kicker: 'IV / ART', title: '美鑑', english: 'Art',
      lead: '空間に、ときめきが宿る。',
      body: [
        '慌ただしい毎日のなかだからこそ、\nふと目に入る美しさを大切にしたいと思っています。',
        'ただ飾るだけではなく、\nその存在によって空間が整い、\n心まで少し豊かになる。\nRemindでは、そこにあるだけで、空間も心も整えてくれるものを選んでいます。',
        '暮らしのなかに、心がふっとほどける景色を。'
      ],
      main: { src: 'images/story_art_1.jpg', alt: '店内に飾られた色彩豊かなアート作品' },
      sub: { src: 'images/story_art_2.jpg', alt: 'アートやオブジェが並ぶ店内' }
    }
  };

  const menuLabel = document.querySelector('.js-menu-label');

  const closeMenu = () => {
    body.classList.remove('menu-open');
    menuButton?.setAttribute('aria-expanded', 'false');
    menuButton?.setAttribute('aria-label', 'メニューを開く');
    if (menuLabel) menuLabel.textContent = 'MENU';
  };

  menuButton?.addEventListener('click', () => {
    const isOpen = body.classList.toggle('menu-open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'メニューを閉じる' : 'メニューを開く');
    if (menuLabel) menuLabel.textContent = isOpen ? 'CLOSE' : 'MENU';
  });
  navLinks.forEach((link) => link.addEventListener('click', closeMenu));

  const closeStory = () => {
    if (!storyDialog?.open) return;
    storyDialog.close();
    document.body.classList.remove('story-open');
    lastStoryTrigger?.focus();
  };

  const openStory = (key, trigger) => {
    const story = stories[key];
    if (!story || !storyDialog) return;
    lastStoryTrigger = trigger;
    storyDialog.querySelector('.js-story-kicker').textContent = story.kicker;
    storyDialog.querySelector('.js-story-title').textContent = story.title;
    storyDialog.querySelector('.js-story-english').textContent = story.english;
    storyDialog.querySelector('.js-story-lead').textContent = story.lead;
    const bodyCopy = storyDialog.querySelector('.js-story-body');
    bodyCopy.replaceChildren(...story.body.map((text) => {
      const paragraph = document.createElement('p');
      text.split('\n').forEach((line, index) => {
        if (index) paragraph.appendChild(document.createElement('br'));
        paragraph.appendChild(document.createTextNode(line));
      });
      return paragraph;
    }));
    const mainImage = storyDialog.querySelector('.js-story-main-image');
    const subImage = storyDialog.querySelector('.js-story-sub-image');
    mainImage.src = story.main.src; mainImage.alt = story.main.alt;
    subImage.src = story.sub.src; subImage.alt = story.sub.alt;
    storyDialog.showModal();
    document.body.classList.add('story-open');
    storyDialog.querySelector('.story-dialog__scroll').scrollTop = 0;
    storyClose?.focus();
  };

  storyTriggers.forEach((trigger) => trigger.addEventListener('click', (event) => {
    event.preventDefault();
    openStory(trigger.dataset.category, trigger);
  }));
  storyClose?.addEventListener('click', closeStory);
  storyLink?.addEventListener('click', closeStory);
  storyDialog?.addEventListener('click', (event) => {
    if (event.target === storyDialog) closeStory();
  });
  storyDialog?.addEventListener('cancel', (event) => {
    event.preventDefault();
    closeStory();
  });
  storyDialog?.addEventListener('close', () => document.body.classList.remove('story-open'));

  const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 24);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  const items = document.querySelectorAll('.js-reveal');
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
    items.forEach((item) => item.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach((item) => observer.observe(item));
});
