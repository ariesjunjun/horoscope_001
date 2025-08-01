import QaButton from "@/components/QaButton";

export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-primary mb-6 text-center">
        このサイトについて
      </h1>

      <div className="space-y-4 text-text leading-relaxed">
        <p>
          <strong>ホロスコープ研究所</strong> は、
          占星術が大好きなすべての人のための、
          匿名掲示板です。
        </p>



        <p className="text-right text-sm text-gray-600 mt-8">
          ホロスコープ研究所 管理人
        </p>
      </div>

      <QaButton />
    </div>
  );
}
