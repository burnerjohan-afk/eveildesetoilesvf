import { generatePageMetadata } from "@/lib/seo";
import { comparativeContent } from "@/content/comparative";
import { Card } from "@/components/ui/Card";

export const metadata = generatePageMetadata(
  "Grille comparative",
  "Comparez nos trois offres d'accompagnement pour choisir celle qui vous convient."
);

export default function GrilleComparativePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-text mb-8 text-center">
        {comparativeContent.title}
      </h1>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto mb-8">
        <table className="w-full border-collapse border border-border">
          <thead>
            <tr className="bg-primary/10">
              <th className="border border-border p-4 text-left font-bold"></th>
              {comparativeContent.columns.map((col) => (
                <th key={col.offerKey} className="border border-border p-4 text-center">
                  <div className="font-bold text-lg">{col.title}</div>
                  <div className="text-sm text-text-light">{col.subtitle}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {comparativeContent.rows.map((row, idx) => (
              <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-background"}>
                <td className="border border-border p-4 font-semibold">{row.label}</td>
                {row.values.map((value, colIdx) => (
                  <td key={colIdx} className="border border-border p-4">
                    {Array.isArray(value) ? (
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        {value.map((item, itemIdx) => (
                          <li key={itemIdx}>{item}</li>
                        ))}
                      </ul>
                    ) : (
                      value
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-6">
        {comparativeContent.columns.map((col, colIdx) => (
          <Card key={col.offerKey}>
            <h2 className="text-xl font-bold text-primary mb-2">{col.title}</h2>
            <p className="text-sm text-text-light mb-4">{col.subtitle}</p>
            <div className="space-y-4">
              {comparativeContent.rows.map((row, rowIdx) => (
                <div key={rowIdx} className="border-b border-border pb-4 last:border-0">
                  <div className="font-semibold mb-2">{row.label}</div>
                  <div className="text-text-light text-sm">
                    {Array.isArray(row.values[colIdx]) ? (
                      <ul className="list-disc list-inside space-y-1">
                        {(row.values[colIdx] as string[]).map((item, itemIdx) => (
                          <li key={itemIdx}>{item}</li>
                        ))}
                      </ul>
                    ) : (
                      row.values[colIdx]
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <div className="text-center mt-12">
        <a
          href="/contact"
          className="inline-block px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
        >
          Demander un devis personnalisé
        </a>
      </div>
    </div>
  );
}
