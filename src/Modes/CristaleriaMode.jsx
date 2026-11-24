import './CristaleriaMode.css';
import { useState, useEffect } from 'react';

const EMPTYCRISTALERIA = {
    'Vaso Corto': { cajas: 0, individuales: 0 },
    'Vaso Largo': { cajas: 0, individuales: 0 },
    'Vaso Huracan': { cajas: 0, individuales: 0 },
};

const CAJASIZE = {
        'Vaso Corto': 24,
        'Vaso Huracan': 12,
    };


export default function CristaleriaMode() {

    const [vasos, setVasos] = useState(EMPTYCRISTALERIA);


   
    const [cortoTotal, setCortoTotal] = useState(0);
    const [largoTotal, setLargoTotal] = useState(0);
    const [huracanTotal, setHuracanTotal] = useState(0);

    useEffect(() => {
        const storedData = localStorage.getItem('cristaleriaData');
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            setVasos(parsedData);
            refreshTotal(parsedData);
        }
      }, []);
    
      useEffect(() => {
        if (vasos === EMPTYCRISTALERIA) return;
        localStorage.setItem('cristaleriaData', JSON.stringify(vasos));
      }, [vasos]);

   const handleInputChange = (tipo, field, value) => {
        const newVasos = {
            ...vasos,
            [tipo]: {
                ...vasos[tipo],
                [field]: value === '' ? '' : Number(value)
            }
        };

        setVasos(newVasos);

        // Update total quantities
        const cajas = Number(newVasos[tipo].cajas) || 0;
        const individuales = Number(newVasos[tipo].individuales) || 0;

        const total = cajas * (CAJASIZE[tipo] || 0) + individuales;
        refreshTotal(newVasos);
    };

    const refreshTotal = (newVasos) => {
        setCortoTotal((Number(newVasos['Vaso Corto'].cajas) || 0) * CAJASIZE['Vaso Corto'] + (Number(newVasos['Vaso Corto'].individuales) || 0));
        setLargoTotal((Number(newVasos['Vaso Largo'].individuales) || 0));
        setHuracanTotal((Number(newVasos['Vaso Huracan'].cajas) || 0) * CAJASIZE['Vaso Huracan'] + (Number(newVasos['Vaso Huracan'].individuales) || 0));
    }


    const handleShareWhatsapp = () => {
        const message = `Cristaleria:\nVaso Corto: ${cortoTotal}\nVaso Largo: ${largoTotal}\nVaso Huracan: ${huracanTotal}\nVaso de Shot: ${shotTotal}`;
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    const handleShareText = () => {
        const message = `Cristaleria:\nVaso Corto: ${cortoTotal}\nVaso Largo: ${largoTotal}\nVaso Huracan: ${huracanTotal}`;
        navigator.clipboard.writeText(message).then(() => {
            alert('Mensaje copiado al portapapeles');
        });
    };

    const handleReset = () => {
        setVasos(EMPTYCRISTALERIA);
        setCortoTotal(0);
        setLargoTotal(0);
        setHuracanTotal(0);
        localStorage.removeItem('cristaleriaData');
    }

    const glassTypes = ['Vaso Huracan', 'Vaso Corto', 'Vaso Largo'];
    const totals = {
        'Vaso Corto': cortoTotal,
        'Vaso Largo': largoTotal,
        'Vaso Huracan': huracanTotal,
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
                <button type="button" onClick={handleReset}>Reiniciar</button>
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
                        {CAJASIZE[type] ?  ( 
                        <>
                            <label className="glass-field">
                                <span>Cajas completas</span>
                                <input
                                    type="number"
                                    min="0"
                                    value={vasos[type].cajas}
                                    onChange={(event) => handleInputChange(type, 'cajas', event.target.value)}
                                    />
                            </label>
                        </>
                        ) : 
                        <>
                        <label className="glass-field">
                                <span>Cajas completas</span>
                                <p className="no-aplica">No aplica</p>
                            </label>
                        </>}
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

