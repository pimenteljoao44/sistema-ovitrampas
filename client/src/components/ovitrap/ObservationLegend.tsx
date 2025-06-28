import { observationCodes } from "@/lib/utils";

export default function ObservationLegend() {
  return (
    <div className="mb-6 p-4 bg-muted rounded-lg">
      <h4 className="text-sm font-medium text-foreground mb-3">
        Convenção das Observações:
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-muted-foreground">
        {Object.entries(observationCodes).map(([code, description]) => (
          <div key={code}>
            <span className="font-medium">{code}</span> - {description}
          </div>
        ))}
      </div>
    </div>
  );
}
