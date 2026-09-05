import { defineFrontComponent } from 'twenty-sdk/define';

import { LOCALIZATION_WIDGET_UNIVERSAL_IDENTIFIER } from 'src/constants/universal-identifiers';

const profileRows = [
  {
    profile: 'EN',
    rule: 'Use professional standard English; keep API, CRM, CI/CD, and DevOps terms unchanged.',
  },
  {
    profile: 'ES',
    rule: 'Use formal RAE-aligned Spanish and usted for external founders unless told otherwise.',
  },
  {
    profile: 'FR-FR-parisian',
    rule: 'Use vouvoiement and precise Parisian corporate French; prefer déploiement and sauvegarde over unnecessary anglicisms.',
  },
  {
    profile: 'PT-PT-pre-AO',
    rule: 'Preserve pre-AO spellings: projecto, recepção, acção, factura, infra-estrutura.',
  },
];

export const LocalizationGuardrail = () => {
  return (
    <section
      style={{
        display: 'grid',
        gap: 12,
        padding: 16,
        fontFamily: 'Inter, sans-serif',
      }}
    >
      <div>
        <h2 style={{ fontSize: 16, margin: 0 }}>Localization Guardrails</h2>
        <p style={{ color: '#667085', fontSize: 13, margin: '4px 0 0' }}>
          Check field labels, email templates, and operator notes against the
          active client profile before status changes leave triage.
        </p>
      </div>
      <div style={{ display: 'grid', gap: 8 }}>
        {profileRows.map((row) => (
          <div
            key={row.profile}
            style={{
              border: '1px solid #D0D5DD',
              borderRadius: 6,
              padding: 10,
            }}
          >
            <strong style={{ display: 'block', fontSize: 13 }}>
              {row.profile}
            </strong>
            <span style={{ color: '#344054', fontSize: 13 }}>{row.rule}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default defineFrontComponent({
  universalIdentifier: LOCALIZATION_WIDGET_UNIVERSAL_IDENTIFIER,
  name: 'quietsystems-localization-guardrail',
  description:
    'QuietSystems localization checklist for CRM records and templates.',
  component: LocalizationGuardrail,
});
