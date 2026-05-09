import { useLocation } from "wouter";
import { ArrowLeft, Shield, AlertTriangle, CheckCircle, FileText } from "lucide-react";
import { LICENSE_NUMBER } from "@/lib/storage";

export default function AMLPolicyPage() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background pb-8">
      <div className="flex items-center gap-3 px-4 pt-10 pb-4">
        <button onClick={() => setLocation("/dashboard")} className="w-9 h-9 rounded-full bg-card flex items-center justify-center" data-testid="button-back">
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 className="font-bold text-lg">AML Policy</h1>
          <p className="text-muted-foreground text-xs">Anti-Money Laundering</p>
        </div>
      </div>

      <div className="px-4 space-y-4">
        <div className="glass-card rounded-2xl p-5 border border-yellow-500/20 text-center">
          <Shield size={32} className="text-yellow-500 mx-auto mb-2" />
          <h2 className="font-bold text-base">Anti-Money Laundering Policy</h2>
          <p className="text-muted-foreground text-xs mt-1">GlobalMinersPay Inc. · License: {LICENSE_NUMBER}</p>
          <p className="text-muted-foreground text-xs">Effective Date: January 1, 2024 · Last Updated: November 1, 2024</p>
        </div>

        {[
          {
            title: "1. Introduction & Purpose",
            content: `GlobalMinersPay Inc. ("the Company") is committed to the highest standards of Anti-Money Laundering (AML) and Counter-Terrorism Financing (CTF) compliance. This policy applies to all users, employees, contractors, and partners associated with the GlobalMinersPay platform.\n\nThe purpose of this policy is to prevent the platform from being used, intentionally or unintentionally, for money laundering, terrorist financing, or any other financial crime. We operate in full compliance with the Bank Secrecy Act (BSA), the USA PATRIOT Act, and all applicable federal and state regulations governing digital asset platforms in the United States.`,
          },
          {
            title: "2. Know Your Customer (KYC) Procedures",
            content: `All users are required to complete identity verification before activating withdrawal privileges. Our KYC process includes:\n\n• Collection of full legal name, phone number, and country of residence\n• Verification of payment method authenticity\n• Cross-referencing against international sanctions lists including OFAC SDN List, EU Consolidated List, and UN Security Council Sanctions List\n• Ongoing monitoring of account activity for suspicious patterns\n\nUsers who fail to complete verification or provide false information will have their accounts suspended immediately and their balances frozen pending investigation.`,
          },
          {
            title: "3. Prohibited Activities",
            content: `The following activities are strictly prohibited on the GlobalMinersPay platform:\n\n• Using funds derived from illegal activities\n• Structuring transactions to avoid reporting thresholds\n• Providing false identity information\n• Using multiple accounts to circumvent platform limits\n• Facilitating transactions on behalf of sanctioned individuals or entities\n• Layering transactions to disguise the origin of funds\n• Using the platform for tax evasion purposes\n\nViolation of these prohibitions will result in immediate account termination, forfeiture of funds, and mandatory reporting to relevant law enforcement authorities.`,
          },
          {
            title: "4. Transaction Monitoring",
            content: `GlobalMinersPay employs automated transaction monitoring systems that analyze all user activity in real-time. Our systems flag:\n\n• Unusual withdrawal patterns inconsistent with mining activity\n• Multiple withdrawal requests within short time periods\n• Requests originating from high-risk jurisdictions\n• Activity matching known money laundering typologies\n\nAll flagged transactions are reviewed by our compliance team within 24–48 hours. Suspicious transactions may be delayed, frozen, or reported to authorities without prior notice to the account holder.`,
          },
          {
            title: "5. Suspicious Activity Reports (SARs)",
            content: `In accordance with the Bank Secrecy Act, GlobalMinersPay is legally required to file Suspicious Activity Reports (SARs) with the Financial Crimes Enforcement Network (FinCEN) when we identify activity that may involve money laundering or other financial crimes.\n\nWe are legally prohibited from disclosing the filing of a SAR to the subject of the report (known as "tipping off"). Users should be aware that unusual activity may result in SAR filing and potential law enforcement involvement without their knowledge.`,
          },
          {
            title: "6. Sanctions Compliance",
            content: `GlobalMinersPay strictly complies with all applicable international sanctions programs administered by:\n\n• U.S. Office of Foreign Assets Control (OFAC)\n• European Union sanctions authorities\n• United Nations Security Council sanctions committee\n• Other relevant international regulatory bodies\n\nServices are not available to individuals or entities located in, or ordinarily resident in, countries subject to comprehensive U.S. sanctions, including but not limited to Cuba, Iran, North Korea, Syria, and the Crimea region of Ukraine. Users from these regions attempting to access the platform will be blocked.`,
          },
          {
            title: "7. Record Keeping",
            content: `GlobalMinersPay maintains comprehensive records of all user transactions, identity verification documents, and compliance-related communications for a minimum period of five (5) years as required by applicable law. These records are stored securely and may be provided to regulatory authorities upon valid legal request.\n\nUser data is processed in accordance with our Privacy Policy and applicable data protection regulations, including the California Consumer Privacy Act (CCPA).`,
          },
          {
            title: "8. Employee & Partner Training",
            content: `All GlobalMinersPay employees and authorized partners involved in user onboarding, transaction processing, or compliance functions are required to complete annual AML training. Training covers recognition of suspicious activity, proper SAR filing procedures, sanctions screening, and compliance obligations under applicable law.`,
          },
          {
            title: "9. Reporting Violations",
            content: `Users, employees, or third parties who suspect violations of this AML policy are encouraged to report concerns to our compliance team at:\n\nEmail: compliance@globalminerspy.com\nAddress: 1234 Innovation Drive, Suite 500, San Francisco, CA 94105, USA\n\nAll reports are treated as confidential. Retaliation against individuals who report AML concerns in good faith is strictly prohibited.`,
          },
          {
            title: "10. Policy Updates",
            content: `This AML Policy is reviewed and updated at least annually, or more frequently as required by changes in applicable law or regulatory guidance. Users will be notified of material changes via the platform. Continued use of GlobalMinersPay services following policy updates constitutes acceptance of the revised terms.`,
          },
        ].map(({ title, content }) => (
          <div key={title} className="glass-card rounded-2xl p-5 space-y-3">
            <h3 className="font-semibold text-sm text-yellow-400 flex items-center gap-2">
              <FileText size={14} /> {title}
            </h3>
            <div className="text-muted-foreground text-xs leading-relaxed whitespace-pre-line">{content}</div>
          </div>
        ))}

        <div className="glass-card rounded-2xl p-4 border border-yellow-500/20 flex items-start gap-3">
          <AlertTriangle size={16} className="text-yellow-500 shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            <span className="text-yellow-400 font-semibold">Important: </span>
            Non-compliance with this AML policy may result in account suspension, fund forfeiture, and referral to law enforcement authorities. GlobalMinersPay cooperates fully with all lawful regulatory and law enforcement requests.
          </p>
        </div>

        <div className="flex items-center gap-2 justify-center py-2">
          <CheckCircle size={14} className="text-green-500" />
          <p className="text-xs text-muted-foreground">GlobalMinersPay is fully AML/CTF compliant</p>
        </div>

        <p className="text-center text-muted-foreground text-xs pb-4">
          © 2024 GlobalMinersPay Inc. · {LICENSE_NUMBER} · United States
        </p>
      </div>
    </div>
  );
}
