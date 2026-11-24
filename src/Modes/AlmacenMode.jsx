import { useState , useEffect} from 'react'
import './AlmacenMode.css'

const initialItems = {
  verduleria: [
    { name: 'Lima', quantity: 0, unit: 'kg' },
    { name: 'Limon', quantity: 0, unit: 'kg' },
    { name: 'Pomelo', quantity: 0, unit: 'kg' },
    { name: 'Naranja', quantity: 0, unit: 'kg' },
    { name: 'Menta', quantity: 0, unit: 'paquetes' },
    { name: 'Banana', quantity: 0, unit: 'unidades' },
    { name: 'Jengibre', quantity: 0, unit: 'unidades' },
    { name: 'Pepino', quantity: 0, unit: 'unidades' },
    { name: 'Romero', quantity: 0, unit: 'paquetes' },
  ],
  helado: [{ name: 'Balde', quantity: 0, unit: 'unidad' }],
  almacen: [
    { name: 'Leche', quantity: 0, unit: 'lt' },
    { name: 'Azucar', quantity: 0, unit: 'kg' },
    { name: 'Miel', quantity: 0, unit: 'lt' },
    { name: 'Paquete Oreo', quantity: 0, unit: 'unidades' },
    { name: 'Clight Limonada', quantity: 0, unit: 'sobres' },
    { name: 'Clight Pomelo Rosado', quantity: 0, unit: 'sobres' },
  ],
}

const sectionNames = {
  verduleria: 'Verduleria',
  helado: 'Helado',
  almacen: 'Almacen',
}

export default function AlmacenMode() {
  const [items, setItems] = useState(initialItems)

  useEffect(() => {
    const storedItems = localStorage.getItem('almacenData')
    if (storedItems) {
      setItems(JSON.parse(storedItems))
    }
  }, [])

  useEffect(() => {
    if (items === initialItems) return
    localStorage.setItem('almacenData', JSON.stringify(items))
  }, [items])

  const handleInputChange = (section, index, value) => {
    setItems((currentItems) => ({
      ...currentItems,
      [section]: currentItems[section].map((item, itemIndex) =>
        itemIndex === index ? { ...item, quantity: '' === value ? '' : Number(value) } : item,
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

  const handleReset = () => {
    setItems(initialItems)
    localStorage.removeItem('almacenData')
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
      <div className="almacen-actions">
        <button type="button" onClick={handleReset}>Reiniciar</button>
        <button type="button" onClick={handleShareWhatsapp}>Compartir por WhatsApp</button>
        <button type="button" onClick={handleShareText}>Copiar mensaje</button>
      </div>

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
    </section>
  )
}