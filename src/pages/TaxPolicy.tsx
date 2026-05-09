import { useLocation } from "wouter";
import { ArrowLeft, TrendingUp, FileText, AlertTriangle, Info, CheckCircle } from "lucide-react";
import { LICENSE_NUMBER } from "@/lib/storage";

export default function TaxPolicyPage() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background pb-8">
      <div className="flex items-center gap-3 px-4 pt-10 pb-4">
        <button onClick={() => setLocation("/dashboard")} className="w-9 h-9 rounded-full bg-card flex items-center justify-center" data-testid="button-back">
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 className="font-bold text-lg">Tax Regulations</h1>
          <p className="text-muted-foreground text-xs">Tax Compliance Policy</p>
        </div>
      </div>

      <div className="px-4 space-y-4">
        <div className="glass-card rounded-2xl p-5 border border-yellow-500/20 text-center">
          <TrendingUp size={32} className="text-yellow-500 mx-auto mb-2" />
          <h2 className="font-bold text-base">Tax Regulations Policy</h2>
          <p className="text-muted-foreground text-xs mt-1">GlobalMinersPay Inc. · {LICENSE_NUMBER}</p>
          <p className="text-muted-foreground text-xs">Effective Date: January 1, 2024</p>
        </div>

        <div className="flex items-start gap-3 bg-blue-500/5 rounded-xl p-4 border border-blue-500/15">
          <Info size={14} className="text-blue-400 mt-0.5 shrink-0" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            <span className="text-blue-400 font-semibold">Disclaimer: </span>
            The following information is provided for general guidance only and does not constitute tax advice. Users are strongly encouraged to consult a qualified tax professional in their jurisdiction for personalized guidance.
          </p>
        </div>

        {[
          {
            title: "1. Overview of Tax Obligations",
            content: `GlobalMinersPay is a digital mining rewards platform. Earnings generated through the platform — including daily mining rewards and any other payments received — may be subject to taxation in your country of residence. Tax treatment of digital asset income varies significantly by jurisdiction.\n\nAs a licensed operator based in the United States, GlobalMinersPay complies with all applicable U.S. federal and state tax laws and may be required to report certain payments to the Internal Revenue Service (IRS) and other relevant tax authorities.`,
          },
          {
            title: "2. U.S. Tax Treatment",
            content: `For users who are U.S. persons (citizens, residents, or entities), the following tax rules generally apply:\n\n• Mining rewards may be treated as ordinary income at the fair market value on the date of receipt (IRS Notice 2014-21, Rev. Rul. 2023-14)\n• Subsequent gains or losses when you convert or spend your mined earnings may be subject to capital gains tax\n• Annual earnings above $600 USD may trigger Form 1099 reporting\n• Self-employment tax may apply if mining constitutes a trade or business activity\n• Users are required to maintain records of all earnings and transactions for tax purposes\n\nWe recommend consulting IRS Publication 544 and IRS Virtual Currency FAQ for detailed guidance.`,
          },
          {
            title: "3. International Tax Considerations",
            content: `Users outside the United States are subject to the tax laws of their country of residence. Digital asset and mining income treatment varies globally:\n\n• European Union: Most EU member states treat mining income as taxable income; VAT treatment varies by country\n• United Kingdom: HMRC treats mining rewards as miscellaneous income or trading income\n• Nigeria: Mining income is generally subject to Personal Income Tax or Companies Income Tax\n• India: Virtual digital assets are taxed at 30% flat rate per Finance Act 2022\n• Other jurisdictions: Users must determine applicable local tax obligations\n\nGlobalMinersPay does not withhold taxes for non-U.S. users but may be required to report income to tax authorities under international information exchange agreements (FATCA, CRS).`,
          },
          {
            title: "4. Platform's Tax Withholding Obligations",
            content: `GlobalMinersPay may be required to withhold taxes on payments under the following circumstances:\n\n• Backup withholding (currently 24%) on payments to U.S. persons who fail to provide a valid Taxpayer Identification Number (TIN) or Social Security Number (SSN)\n• FATCA withholding on payments to certain foreign financial institutions or non-participating foreign financial institutions\n• State-level withholding requirements as applicable\n\nUsers who provide valid tax documentation will not be subject to backup withholding. U.S. users may be required to submit Form W-9; non-U.S. users may need to submit the appropriate Form W-8 series.`,
          },
          {
            title: "5. Information Reporting",
            content: `GlobalMinersPay is required to report certain payments to tax authorities. This may include:\n\n• Form 1099-MISC or Form 1099-NEC for U.S. users with qualifying annual earnings\n• Common Reporting Standard (CRS) reporting for non-U.S. users in participating jurisdictions\n• FATCA reporting for U.S. persons regardless of location\n\nUsers will be notified if their earnings trigger reporting thresholds. Copies of any tax forms issued will be made available through the platform or delivered to the address on file.`,
          },
          {
            title: "6. Record Keeping Requirements",
            content: `Users are advised to maintain accurate records of all platform activity for tax purposes, including:\n\n• Date and amount of each daily mining reward received\n• Date and amount of each withdrawal\n• Fair market value of rewards at time of receipt\n• Any applicable exchange rates for local currency conversion\n• Transaction IDs for all payment receipts\n\nGlobalMinersPay provides transaction history within the platform. Users should export and save this data regularly. Records should be retained for a minimum of 7 years or as required by your jurisdiction.`,
          },
          {
            title: "7. Tax Identification",
            content: `To ensure proper tax compliance, GlobalMinersPay may request Tax Identification Numbers (TINs) from users at the time of withdrawal processing. Providing a valid TIN is a legal requirement in many jurisdictions.\n\nFailure to provide required tax identification may result in backup withholding, delayed withdrawals, or account suspension. False or fraudulent tax information provided to GlobalMinersPay may constitute a criminal offense subject to penalties.`,
          },
          {
            title: "8. Value Added Tax (VAT)",
            content: `GlobalMinersPay's services may be subject to VAT, GST, or similar indirect taxes in certain jurisdictions. Users in VAT-applicable regions (including EU member states and UK) may be responsible for self-assessing VAT on digital services received from GlobalMinersPay as a non-resident supplier.\n\nBusinesses registered for VAT in their jurisdiction should consult their tax advisor regarding the VAT treatment of digital mining rewards and platform fees.`,
          },
          {
            title: "9. Platform's Tax Position",
            content: `GlobalMinersPay Inc. files all required federal, state, and local tax returns in the United States and maintains current tax registrations in all jurisdictions where required by law. The company maintains an arms-length relationship with related entities and complies with transfer pricing regulations.\n\nAll platform fees and service charges are subject to applicable taxes, which are reflected in the terms of service and fee schedules published on the platform.`,
          },
          {
            title: "10. Seeking Professional Advice",
            content: `Tax law relating to digital assets and mining rewards is complex and evolving rapidly. GlobalMinersPay strongly recommends that all users:\n\n• Consult a qualified tax professional or accountant familiar with digital asset taxation in their jurisdiction\n• Review guidance issued by their local tax authority regularly\n• Consider using cryptocurrency tax software to track and calculate tax liabilities\n• File all required tax returns on time to avoid penalties and interest\n\nGlobalMinersPay is not responsible for any tax liabilities incurred by users as a result of their use of the platform.`,
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
            <span className="text-yellow-400 font-semibold">User Responsibility: </span>
            It is the sole responsibility of each user to determine, declare, and pay any applicable taxes on earnings received through GlobalMinersPay. The platform provides information for compliance purposes only and does not provide tax advice.
          </p>
        </div>

        <div className="flex items-center gap-2 justify-center py-2">
          <CheckCircle size={14} className="text-green-500" />
          <p className="text-xs text-muted-foreground">GlobalMinersPay is fully tax compliant (IRS registered)</p>
        </div>

        <p className="text-center text-muted-foreground text-xs pb-4">
          © 2024 GlobalMinersPay Inc. · {LICENSE_NUMBER} · United States
        </p>
      </div>
    </div>
  );
}
