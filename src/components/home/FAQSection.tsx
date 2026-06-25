import React, { useState } from 'react';

const FAQSection: React.FC = () => {
  const faqs = [
    {
      question: "Как купить недвижимость в Белореченске?",
      answer: "Для покупки недвижимости достаточно оставить заявку на нашем сайте или связаться с нашими специалистами. Мы подберем подходящие варианты, организуем показы и полностью сопроводим сделку от проверки документов до регистрации права собственности."
    },
    {
      question: "Сколько стоит квартира в Белореченске в 2026 году?",
      answer: "В 2026 году цены на квартиры в Белореченске варьируются в зависимости от района и состояния жилья. В среднем, стоимость на вторичном рынке начинается от 3.5 млн рублей, а в современных новостройках — от 4-5 млн рублей."
    },
    {
      question: "Сколько будет стоить квартира в Белореченске в 2030 году?",
      answer: "Учитывая стабильное развитие инфраструктуры города и инфляционные процессы, эксперты «Юг-Хаус» прогнозируют ежегодный рост цен на недвижимость в пределах 5-8%. Это делает покупку жилья сейчас отличной инвестицией."
    },
    {
      question: "Почему квартиры в новостройках дороже чем вторичка?",
      answer: "Новостройки предлагают современные планировки, новые инженерные коммуникации, благоустроенную придомовую территорию и юридическую чистоту. Вы платите за комфорт, безопасность и отсутствие необходимости в капитальном ремонте."
    },
    {
      question: "Что дает покупка квартиры в Белореченске?",
      answer: "Белореченск — это развивающийся город с благоприятным южным климатом, отличной экологией и удобным расположением недалеко от Краснодара и гор. Покупка квартиры здесь — это вклад в комфортную жизнь."
    },
    {
      question: "Почему стоит обратиться в агентство недвижимости?",
      answer: "Обращение в «Юг-Хаус» экономит ваше время и защищает от рисков. Мы гарантируем юридическую чистоту сделки, помогаем с оформлением ипотеки на выгодных условиях и берем на себя все переговоры и бумажную волокиту."
    },
    {
      question: "Сколько в среднем стоит квартира в центре в 2026 году?",
      answer: "Квартиры в центре Белореченска традиционно пользуются высоким спросом. В 2026 году средняя стоимость 1-комнатной квартиры в центральном районе составляет около 4.5 - 5.5 млн рублей, в зависимости от ремонта и класса дома."
    },
    {
      question: "Сколько денег нужно на жизнь в Белореченске?",
      answer: "Белореченск отличается доступными ценами на свежие продукты и услуги. В среднем, комфортное проживание одного человека без учета аренды жилья или ипотеки обойдется примерно в 25-35 тысяч рублей в месяц."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section style={{ marginBottom: '4rem' }}>
      <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '2rem' }}>Продать или купить недвижимость в Белореченске</h2>
      <div className="faq-grid">
        {faqs.map((faq, idx) => (
          <div key={idx} style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            padding: '1rem 1.5rem',
            borderRadius: 'var(--radius)',
            cursor: 'pointer',
            transition: 'background 0.2s',
            boxShadow: 'var(--shadow-sm)',
            alignSelf: 'start'
          }} onClick={() => toggle(idx)}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 600, color: openIndex === idx ? 'var(--primary)' : 'var(--text)', transition: 'color 0.2s' }}>
                {faq.question}
              </span>
              <div style={{
                background: openIndex === idx ? 'var(--primary)' : 'var(--accent)',
                color: 'white',
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                transform: openIndex === idx ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'all 0.3s ease',
                marginLeft: '1rem'
              }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
            </div>
            {openIndex === idx && (
              <div style={{
                marginTop: '1rem',
                paddingTop: '1rem',
                borderTop: '1px solid var(--border)',
                color: 'var(--text-light)',
                lineHeight: 1.6,
                fontSize: '0.95rem',
                animation: 'fadeIn 0.3s ease-in-out'
              }}>
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
