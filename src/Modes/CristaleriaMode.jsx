import './CristaleriaMode.css';
import { useState } from 'react';

export default function CristaleriaMode() {

    const [vasos, setVasos] = useState({
        'Vaso Corto': { cajas: 0, individuales: 0 },
        'Vaso Largo': { cajas: 0, individuales: 0 },
        'Vaso Huracan': { cajas: 0, individuales: 0 },
        'Vaso de Shot': { cajas: 0, individuales: 0 }
    });

    const cajasSizes = {
        'Vaso Corto': 24,
        'Vaso Largo': 1,
        'Vaso Huracan': 12,
        'Vaso de Shot': 1
    };

    const [cortoTotal, setCortoTotal] = useState(0);
    const [largoTotal, setLargoTotal] = useState(0);
    const [huracanTotal, setHuracanTotal] = useState(0);
    const [shotTotal, setShotTotal] = useState(0);

    const handleInputChange = (tipo, field, value) => {
        const newVasos = { ...vasos };
        newVasos[tipo][field] = parseInt(value) || 0;
        setVasos(newVasos);

        // Update total quantities
        switch (tipo) {
            case 'Vaso Corto':
                setCortoTotal(newVasos[tipo].cajas * cajasSizes[tipo] + newVasos[tipo].individuales);
                break;
            case 'Vaso Largo':
                setLargoTotal(newVasos[tipo].cajas * cajasSizes[tipo] + newVasos[tipo].individuales);
                break;
            case 'Vaso Huracan':
                setHuracanTotal(newVasos[tipo].cajas * cajasSizes[tipo] + newVasos[tipo].individuales);
                break;
            case 'Vaso de Shot':
                setShotTotal(newVasos[tipo].cajas * cajasSizes[tipo] + newVasos[tipo].individuales);
                break;
            default:
                break;
        }
    };

    const handleSave = () => {
        const dataToSave = {
            vasos,
            totals: {
                'Vaso Corto': cortoTotal,
                'Vaso Largo': largoTotal,
                'Vaso Huracan': huracanTotal,
                'Vaso de Shot': shotTotal
            }
        };
        localStorage.setItem('cristaleriaData', JSON.stringify(dataToSave));
    };

    const handleLoad = () => {
        const savedData = JSON.parse(localStorage.getItem('cristaleriaData'));
        if (savedData) {
            if (savedData.vasos) {
                setVasos(savedData.vasos);
                setCortoTotal(savedData.totals['Vaso Corto'] || 0);
                setLargoTotal(savedData.totals['Vaso Largo'] || 0);
                setHuracanTotal(savedData.totals['Vaso Huracan'] || 0);
                setShotTotal(savedData.totals['Vaso de Shot'] || 0);
            } else {
                setCortoTotal(savedData['Vaso Corto'] || 0);
                setLargoTotal(savedData['Vaso Largo'] || 0);
                setHuracanTotal(savedData['Vaso Huracan'] || 0);
                setShotTotal(savedData['Vaso de Shot'] || 0);
                setVasos(Object.fromEntries(Object.keys(vasos).map((type) => [
                    type,
                    { cajas: 0, individuales: savedData[type] || 0 }
                ])));
            }
        }
    };

    const handleShareWhatsapp = () => {
        const message = `Cristaleria:\nVaso Corto: ${cortoTotal}\nVaso Largo: ${largoTotal}\nVaso Huracan: ${huracanTotal}\nVaso de Shot: ${shotTotal}`;
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    const handleShareText = () => {
        const message = `Cristaleria:\nVaso Corto: ${cortoTotal}\nVaso Largo: ${largoTotal}\nVaso Huracan: ${huracanTotal}\nVaso de Shot: ${shotTotal}`;
        navigator.clipboard.writeText(message).then(() => {
            alert('Mensaje copiado al portapapeles');
        });
    };

    const glassTypes = ['Vaso Huracan', 'Vaso Corto', 'Vaso Largo', 'Vaso de Shot'];
    const totals = {
        'Vaso Corto': cortoTotal,
        'Vaso Largo': largoTotal,
        'Vaso Huracan': huracanTotal,
        'Vaso de Shot': shotTotal,
    };

  return (
        <section className="cristaleria-mode">
            <header className="mode-heading">
                <div>
                    <p className="mode-eyebrow">Inventario</p>
                    <h2>Cristaleria</h2>
                </div>
                <p>Caja de huracan = 12 , Cada de Vaso corto = 24 , los otros no los se.</p>
            </header>
            <div className="mode-actions">
                <button type="button" onClick={handleSave}>Guardar</button>
                <button type="button" onClick={handleLoad}>Cargar</button>
                <button type="button" onClick={handleShareWhatsapp}>Compartir por WhatsApp</button>
                <button type="button" onClick={handleShareText}>Copiar mensaje</button>
            </div>
            <div className="glass-table">
                <div className="glass-row glass-labels">
                    <span>Tipo de vaso</span>
                    <span>Cajas completas</span>
                    <span>Individuales</span>
                    <span>Total</span>
                </div>
                {glassTypes.map((type) => (
                    <div className="glass-row" key={type}>
                        <strong className="glass-name">{type}</strong>
                        <label className="glass-field">
                            <span>Cajas completas</span>
                            <input
                                type="number"
                                min="0"
                                value={vasos[type].cajas}
                                onChange={(event) => handleInputChange(type, 'cajas', event.target.value)}
                            />
                        </label>
                        <label className="glass-field">
                            <span>Individuales</span>
                            <input
                                type="number"
                                min="0"
                                value={vasos[type].individuales}
                                onChange={(event) => handleInputChange(type, 'individuales', event.target.value)}
                            />
                        </label>
                        <output className="glass-total">{totals[type]}</output>
                    </div>
                ))}
            </div>
        </section>
  )
}

