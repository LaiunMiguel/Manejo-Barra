import { useState } from 'react'
import './AlmacenMode.css'

const initialItems = {
  verduleria: [
    { name: 'Lima', quantity: 6, unit: 'kg' },
    { name: 'Limon', quantity: 1, unit: 'kg' },
    { name: 'Pomelo', quantity: 4, unit: 'kg' },
    { name: 'Naranja', quantity: 8, unit: 'kg' },
    { name: 'Menta', quantity: 0, unit: 'paquetes' },
    { name: 'Banana', quantity: 0, unit: 'unidades' },
    { name: 'Jengibre', quantity: 0, unit: 'unidades' },
    { name: 'Pepino', quantity: 0, unit: 'unidades' },
    { name: 'Romero', quantity: 0, unit: 'paquetes' },
  ],
  helado: [{ name: 'Balde', quantity: 1, unit: 'unidad' }],
  almacen: [
    { name: 'Leche', quantity: 1, unit: 'lt' },
    { name: 'Azucar', quantity: 7, unit: 'kg' },
    { name: 'Miel', quantity: 0, unit: 'lt' },
    { name: 'Paquete Oreo', quantity: 28, unit: 'unidades' },
    { name: 'Clight Limonada', quantity: 15, unit: 'sobres' },
    { name: 'Clight Pomelo Rosado', quantity: 15, unit: 'sobres' },
  ],
}

const sectionNames = {
  verduleria: 'Verduleria',
  helado: 'Helado',
  almacen: 'Almacen',
}

export default function AlmacenMode() {
  const [items, setItems] = useState(initialItems)

  const handleInputChange = (section, index, value) => {
    setItems((currentItems) => ({
      ...currentItems,
      [section]: currentItems[section].map((item, itemIndex) =>
        itemIndex === index ? { ...item, quantity: Number(value) || 0 } : item,
      ),
    }))
  }

  const createMessage = () => {
    const lines = ['SALON: Hudson | FECHA: 24/10/2026', '']

    Object.entries(items).forEach(([section, sectionItems]) => {
      lines.push(sectionNames[section].toUpperCase())
      sectionItems.forEach(({ name, quantity, unit }) => {
        lines.push(`${name}: ${quantity} ${unit}`)
      })
      lines.push('')
    })

    return lines.join('\n').trim()
  }

  const handleSave = () => {
    localStorage.setItem('almacenData', JSON.stringify(items))
  }

  const handleLoad = () => {
    const savedItems = localStorage.getItem('almacenData')
    if (savedItems) {
      setItems(JSON.parse(savedItems))
    }
  }

  const handleShareWhatsapp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(createMessage())}`, '_blank')
  }

  const handleShareText = () => {
    navigator.clipboard.writeText(createMessage()).then(() => {
      alert('Mensaje copiado al portapapeles')
    })
  }

  return (
    <section className="almacen-mode">
      <header className="almacen-header">
        <div>
          <p className="mode-eyebrow">Control de stock</p>
          <h2>Almacen</h2>
        </div>
        <div className="event-details">
          <span>Salon: <strong>Hudson</strong></span>
          <span>Fecha: <strong>24/10/2026</strong></span>
        </div>
      </header>

      <div className="stock-sections">
        {Object.entries(items).map(([section, sectionItems]) => (
          <section className="stock-section" key={section}>
            <div className="section-heading">
              <h3>{sectionNames[section]}</h3>
              <span>{sectionItems.length} productos</span>
            </div>
            <div className="stock-table">
              <div className="stock-row stock-labels">
                <span>Producto</span>
                <span>Cantidad</span>
                <span>Unidad</span>
              </div>
              {sectionItems.map((item, index) => (
                <div className="stock-row" key={item.name}>
                  <label htmlFor={`${section}-${index}`}>{item.name}</label>
                  <input
                    id={`${section}-${index}`}
                    type="number"
                    min="0"
                    step="0.1"
                    value={item.quantity}
                    onChange={(event) => handleInputChange(section, index, event.target.value)}
                  />
                  <span>{item.unit}</span>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="almacen-actions">
        <button type="button" onClick={handleSave}>Guardar</button>
        <button type="button" onClick={handleLoad}>Cargar</button>
      </div>
      <div className="share-container">
        <p>Compartir pedido</p>
        <button type="button" onClick={handleShareWhatsapp}>Compartir por WhatsApp</button>
        <button type="button" onClick={handleShareText}>Copiar mensaje</button>
      </div>
    </section>
  )
}