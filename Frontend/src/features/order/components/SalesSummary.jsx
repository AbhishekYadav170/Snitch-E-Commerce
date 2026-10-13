import React, { useEffect, useState } from 'react';
import { getSellerSummary } from '../service/order.api';

const GOLD = '#FFD700';

const SalesSummary = () => {
    const [ summary, setSummary ] = useState(null);
    const [ error, setError ] = useState(null);

    useEffect(() => {
        getSellerSummary()
            .then(data => setSummary(data.summary))
            .catch(() => setError('Could not load sales summary.'));
    }, []);

    if (error) {
        return <p className="pb-10 text-[11px] uppercase tracking-[0.15em]" style={{ color: '#ff9a94' }}>{error}</p>;
    }
    if (!summary) return null;

    const maxDay = Math.max(1, ...summary.last7Days.map(d => d.revenue));
    const { statusCounts } = summary;

    const cards = [
        { label: 'Total Revenue', value: `${summary.currency} ${summary.revenue.toLocaleString()}` },
        { label: 'Units Sold', value: summary.unitsSold },
        { label: 'Orders', value: summary.orderCount },
        { label: 'Pending Orders', value: (statusCounts.placed || 0) + (statusCounts.processing || 0) },
    ];

    return (
        <div className="pb-14">
            <h2 className="text-[10px] uppercase tracking-[0.3em] mb-5" style={{ color: GOLD }}>Sales Summary</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                {cards.map((c, i) => (
                    <div key={i} className="px-6 py-6 border flex flex-col gap-1" style={{ borderColor: '#33302a', backgroundColor: '#1c1b1b' }}>
                        <span className="text-2xl md:text-3xl font-light" style={{ fontFamily: "'Cormorant Garamond', serif", color: '#e5e2e1' }}>
                            {c.value}
                        </span>
                        <span className="text-[10px] uppercase tracking-[0.2em]" style={{ color: '#999077' }}>{c.label}</span>
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-4">
                {/* Last 7 days bar chart */}
                <div className="p-6 border" style={{ borderColor: '#33302a', backgroundColor: '#1c1b1b' }}>
                    <p className="text-[10px] uppercase tracking-[0.2em] mb-5" style={{ color: '#999077' }}>Revenue · last 7 days</p>
                    <div className="flex items-end gap-3 h-36">
                        {summary.last7Days.map((d, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center justify-end h-full gap-2" title={`${d.label}: ${summary.currency} ${d.revenue.toLocaleString()}`}>
                                <div
                                    className="w-full"
                                    style={{ height: `${Math.max(d.revenue > 0 ? 6 : 2, (d.revenue / maxDay) * 100)}%`, backgroundColor: d.revenue > 0 ? GOLD : '#33302a' }}
                                />
                                <span className="text-[9px]" style={{ color: '#6b6459' }}>{d.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top products */}
                <div className="p-6 border" style={{ borderColor: '#33302a', backgroundColor: '#1c1b1b' }}>
                    <p className="text-[10px] uppercase tracking-[0.2em] mb-5" style={{ color: '#999077' }}>Top selling products</p>
                    {summary.topProducts.length === 0 ? (
                        <p className="text-sm" style={{ color: '#6b6459' }}>No sales yet.</p>
                    ) : (
                        <div className="flex flex-col gap-3">
                            {summary.topProducts.map((p, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <span className="text-[11px] w-4" style={{ color: '#6b6459' }}>{i + 1}</span>
                                    {p.image && <img src={p.image} alt="" className="w-9 h-11 object-cover" />}
                                    <span className="flex-1 text-sm truncate" style={{ color: '#e5e2e1' }}>{p.title}</span>
                                    <span className="text-[11px]" style={{ color: '#999077' }}>{p.units} sold</span>
                                    <span className="text-[11px]" style={{ color: GOLD }}>{summary.currency} {p.revenue.toLocaleString()}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SalesSummary;
