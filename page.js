document.addEventListener('DOMContentLoaded', () => {
  const page = document.querySelector('[data-page]');
  const pageNumber = Number(page?.dataset.page || 0);
  const pageCount = 9;
  const links = document.querySelectorAll('[data-next-page]');

  const loginShell = document.getElementById('loginShell');
  if (!page && sessionStorage.getItem('birthdayUnlocked') === 'true') {
    loginShell?.classList.add('hidden');
  }

  if (pageNumber > 0) {
    const unlocked = sessionStorage.getItem('birthdayUnlocked') === 'true';
    const maxPage = Number(sessionStorage.getItem('birthdayMaxPage') || 0);
    if (!unlocked || pageNumber > maxPage) {
      window.location.replace('index.html');
      return;
    }
  }

  page?.classList.add('is-active', 'is-visible');
  links.forEach((link) => {
    link.addEventListener('click', () => {
      const nextPage = Number(link.dataset.nextPage);
      const maxPage = Number(sessionStorage.getItem('birthdayMaxPage') || 0);
      if (nextPage > maxPage) sessionStorage.setItem('birthdayMaxPage', String(nextPage));
    });
  });

  const countdown = document.getElementById('countdownDisplay');
  if (countdown) {
    const update = () => {
      const target = new Date();
      target.setDate(target.getDate() + 1);
      target.setHours(0, 0, 0, 0);
      const difference = Math.max(0, target - new Date());
      const values = [
        Math.floor(difference / 86400000),
        Math.floor(difference / 3600000) % 24,
        Math.floor(difference / 60000) % 60,
        Math.floor(difference / 1000) % 60
      ];
      countdown.querySelectorAll('[data-time]').forEach((item, index) => {
        item.textContent = String(values[index]).padStart(2, '0');
      });
    };
    update();
    window.setInterval(update, 1000);
  }

  const gift = document.getElementById('giftBtn');
  const giftMessage = document.getElementById('giftMessage');
  gift?.addEventListener('click', () => {
    const open = giftMessage.hidden;
    giftMessage.hidden = !open;
    gift.setAttribute('aria-expanded', String(open));
  });

  const audio = document.getElementById('audio');
  const play = document.getElementById('playToggle');
  play?.addEventListener('click', () => {
    if (audio?.src) {
      if (audio.paused) audio.play().catch(() => {});
      else audio.pause();
      play.textContent = audio.paused ? 'Play song' : 'Pause song';
      return;
    }

    if ('speechSynthesis' in window) {
      if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
        play.textContent = 'Play song';
        return;
      }
      const greeting = new SpeechSynthesisUtterance('Happy Birthday, Neha Sarma!');
      greeting.rate = 0.9;
      greeting.pitch = 1.15;
      greeting.onend = () => { play.textContent = 'Play song'; };
      speechSynthesis.speak(greeting);
      play.textContent = 'Pause song';
    }
  });
});
