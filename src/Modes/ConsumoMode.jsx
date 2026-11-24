import './ConsumoMode.css';
import { useState, useEffect } from 'react';

const EMPTYCONSUMO = {
        Fernet: { inicial: 0, sobrante: 0 },
        Campari: { inicial: 0, sobrante: 0 },
        Aperol: { inicial: 0, sobrante: 0 },
        Ron: { inicial: 0, sobrante: 0 },
        Vodka: { inicial: 0, sobrante: 0 },
        Gin: { inicial: 0, sobrante: 0 },
        Gancia: { inicial: 0, sobrante: 0 },
        Vermouth: { inicial: 0, sobrante: 0 },
        Cynar: { inicial: 0, sobrante: 0 },
        Whisky: { inicial: 0, sobrante: 0 },
        'Piña colada': { inicial: 0, sobrante: 0 },
        'pulpa frutilla': { inicial: 0, sobrante: 0 },
        'pulpa durazno': { inicial: 0, sobrante: 0 },
};

export default function ConsumoMode() {
  const [consumoData, setConsumoData] = useState(EMPTYCONSUMO);

  useEffect(() => {
    const storedData = localStorage.getItem('consumoData');
    if (storedData) {
      setConsumoData(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    if (consumoData === EMPTYCONSUMO) return;
    localStorage.setItem('consumoData', JSON.stringify(consumoData));
  }, [consumoData]);

  const handleQuantityChange = (drink, field, value) => {
    setConsumoData((currentData) => ({
      ...currentData,
      [drink]: {
        ...currentData[drink],
        [field]: value === '' ? '' : Number(value),
      },
    }));
    localStorage.setItem('consumoData', JSON.stringify(consumoData));
  };

  const handleReset = () => {
    setConsumoData({
      Fernet: { inicial: 0, sobrante: 0 },
      Campari: { inicial: 0, sobrante: 0 },
      Aperol: { inicial: 0, sobrante: 0 },
      Ron: { inicial: 0, sobrante: 0 },
      Vodka: { inicial: 0, sobrante: 0 },
      Gin: { inicial: 0, sobrante: 0 },
      Gancia: { inicial: 0, sobrante: 0 },
      Vermouth: { inicial: 0, sobrante: 0 },
      Cynar: { inicial: 0, sobrante: 0 },
      Whisky: { inicial: 0, sobrante: 0 },
      'Piña colada': { inicial: 0, sobrante: 0 },
      'pulpa frutilla': { inicial: 0, sobrante: 0 },
      'pulpa durazno': { inicial: 0, sobrante: 0 },
    })
  }

  const handleCargarBase = () => {
    setConsumoData({
      Fernet: { inicial: 2, sobrante: 0 },
      Campari: { inicial: 2, sobrante: 0 },
      Aperol: { inicial: 2, sobrante: 0 },
      Ron: { inicial: 2, sobrante: 0 },
      Vodka: { inicial: 2, sobrante: 0 },
      Gin: { inicial: 2, sobrante: 0 },
      Gancia: { inicial: 1, sobrante: 0 },
      Vermouth: { inicial: 1, sobrante: 0 },
      Cynar: { inicial: 1, sobrante: 0 },
      Whisky: { inicial: 1, sobrante: 0 },
      'Piña colada': { inicial: 1, sobrante: 0 },
      'pulpa frutilla': { inicial: 6, sobrante: 0 },
      'pulpa durazno': { inicial: 2, sobrante: 0 },
    })
  }

  const createMessage = () => {
    const reportOrder = [
      ['Fernet', 'Fernet'],
      ['Campari', 'Campari'],
      ['Aperol', 'Aperol'],
      ['Ron', 'Ron'],
      ['Vodka', 'Vodka'],
      ['Gin', 'Gin'],
      ['Gancia', 'Gancia'],
      ['Cinzano', 'Vermouth'],
      ['Cynar', 'Cynar'],
      ['Whiskey', 'Whisky'],
      ['Piña colada', 'Piña colada'],
      ['Pulpa frutilla', 'pulpa frutilla'],
      ['Pulpa durazno', 'pulpa durazno'],
    ]
    const now = new Date()
    const date = `${String(now.getDate()).padStart(2, '0')}/${String(now.getMonth() + 1).padStart(2, '0')}/${now.getFullYear()}`
    const formatQuantity = (value) => {
      const quantity = Number(value) || 0
      const absoluteQuantity = Number(Math.abs(quantity).toFixed(2))
      const whole = Math.floor(absoluteQuantity)
      const decimal = Number((absoluteQuantity - whole).toFixed(2))
      const quarter = Math.round(decimal * 4)
      const quarterFractions = ['', '1/4', '1/2', '3/4']
      const isQuarter = quarter < quarterFractions.length && Math.abs(decimal - quarter / 4) < 0.001
      const amount = isQuarter
        ? `${whole}${quarterFractions[quarter] ? `${whole ? ' ' : ''}${quarterFractions[quarter]}` : ''}`
        : String(absoluteQuantity)
      return quantity < 0 ? `-${amount}` : amount
    }

    return [
      `CONSUMO BARRA:\nFECHA: ${date}`,
      ...reportOrder.map(([label, key]) => {
        const { inicial, sobrante } = consumoData[key]
        return `${label} ${formatQuantity(Number(inicial) - Number(sobrante))}`
      }),
    ].join('\n')
  }

  const handleShareWhatsapp = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(createMessage())}`
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
  }

  const handleShareText = async () => {
    await navigator.clipboard.writeText(createMessage())
    alert('Mensaje copiado al portapapeles')
  }

  return (
    <section className="consumo-mode">
      <header className="mode-heading">
        <div>
          <p className="mode-eyebrow">Inventario</p>
          <h2>Consumo de bebidas</h2>
        </div>
        <p>Ingresá la cantidad inicial y lo que quedó al final.</p>
      </header>
      <div className="consumo-buttons">
        <button onClick={handleReset}>Resetear</button>
        <button onClick={handleCargarBase}>Cargar Base</button>
        <button onClick={handleShareWhatsapp}>Compartir por WhatsApp</button>
        <button onClick={handleShareText}>Copiar Mensaje</button>
      </div>
      <div className="bebidas-consumo-container">
        <div className="consumo-row consumo-labels">
          <span>Bebida</span>
          <span>Cantidad inicial</span>
          <span>Final / sobrante</span>
          <span>Consumo</span>
        </div>
        {Object.entries(consumoData).map(([drink, quantities]) => (
          <div className="consumo-row" key={drink}>
            <label htmlFor={`${drink}-inicial`}>{drink}</label>
            <input
              id={`${drink}-inicial`}
              type="number"
              min="0"
              step="0.1"
              value={quantities.inicial}
              onChange={(event) => handleQuantityChange(drink, 'inicial', event.target.value)}
            />
            <input
              id={`${drink}-sobrante`}
              type="number"
              min="0"
              step="0.1"
              aria-label={`${drink}, cantidad final o sobrante`}
              value={quantities.sobrante}
              onChange={(event) => handleQuantityChange(drink, 'sobrante', event.target.value)}
            />
            <output>
              {Number((Number(quantities.inicial) - Number(quantities.sobrante)).toFixed(2))}
            </output>
          </div>
        ))}
      </div>
    </section>
  )
}