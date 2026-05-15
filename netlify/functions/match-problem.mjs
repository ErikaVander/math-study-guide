import Anthropic from "@anthropic-ai/sdk";

const VIDEOS = [
  { id: "m1mU0C_LUXk", title: "Chapter 1 — Greatest Common Factor (GCF)", topics: "GCF, greatest common factor, factor trees, finding largest shared factor of two numbers" },
  { id: "DTigtpSmhoI", title: "Chapter 1 — Least Common Multiple (LCM) + Simplifying with LCM", topics: "LCM, least common multiple, adding fractions with different denominators" },
  { id: "WfZUgfqouxU", title: "Chapter 1 — All Problem Types", topics: "exponent rules, x^0=1, x^1=x, multiplying exponents, simplifying expressions with exponents" },
  { id: "RNkTP4mPU0I", title: "Chapter 2 — Use GCF to Simplify the Expression", topics: "simplifying algebraic expressions by factoring out GCF, like (75A²Y − 50AX)/5AX" },
  { id: "OebnNiiQiyE", title: "Chapter 2 — All Problem Types", topics: "adding fractions with variables, common denominators with polynomials, solve for x with exponents" },
  { id: "SQgRtfi6KQ4", title: "Chapter 3 — Convert to Scientific Notation", topics: "converting large/small numbers to scientific notation, like 45000 or .00345" },
  { id: "vVjsNU7U2x4", title: "Chapter 3 — Multiply & Divide Numbers in Scientific Notation", topics: "multiplying and dividing numbers in scientific notation, like (4.5×10⁶)(3.2×10³)" },
  { id: "wLxsGKMdUzU", title: "Chapter 3 — Another Example: Scientific Notation Problems", topics: "more scientific notation multiplication/division examples" },
  { id: "AZedwu9wFkk", title: "Simplify Complex or Large Radicals", topics: "simplifying square roots, breaking down radicals like √200 or √(84x⁴y⁵), perfect squares" },
  { id: "v1gnhSQvVHY", title: "Chapter 4 — Radicals in Denominator", topics: "rationalizing denominator, removing square root from denominator, multiply by form of 1" },
  { id: "mTwBuMt1u1w", title: "Chapter 4 — Radical in Denominator", topics: "rationalizing denominator with binomials, conjugates in denominator" },
  { id: "humrqTBo7B8", title: "Chapter 4 — Adding & Subtracting Fractions with Radicals / Distributing Radicals", topics: "adding fractions with radicals in denominator, rule of four, distributing radicals" },
  { id: "aIzvVj0QAsI", title: "Chapter 4 — Adding Fractions with Radicals in Denominator (with Negatives)", topics: "adding fractions with radicals and negative numerators" },
  { id: "JfFo2fKXI7A", title: "Solve for X, with Fractions", topics: "solving equations with mixed numbers and fractions, cross multiplication" },
  { id: "zxgMef9nwGo", title: "Chapter 5 — Factoring Trinomials and Binomials", topics: "factoring x²+bx+c into (x+?)(x+?), difference of squares like x²−16, trinomial factoring" },
  { id: "GF7Ko4jCgic", title: "Chapter 5 — Factoring Polynomials with Coefficients", topics: "factoring when leading coefficient isn't 1, like 3x²+17x+10 or 6x²−2x−4" },
  { id: "1o7jJCIetqs", title: "Chapter 5 — Find GCF Before Factoring Polynomial", topics: "pulling out GCF before factoring, like 2x²+12x+16 → 2(x²+6x+8)" },
  { id: "HebUASufYgM", title: "Chapter 5 — Repeated Factoring", topics: "factoring multiple times, difference of squares repeatedly, like x⁴−17x²+16" },
  { id: "TC2ygpd1Dig", title: "Chapter 5 — Combining Fractions with Polynomials (Rule of Four)", topics: "combining fractions with polynomial denominators, rule of four, common denominator with polynomials" },
  { id: "-mLdqkhIx9k", title: "Chapter 5 — Simplify Fractions with Fractions in Denominator & Numerator", topics: "complex fractions, fractions inside fractions, simplifying nested fractions" },
  { id: "WHJ3_tuAVoo", title: "Chapter 5 — Solve for X with Polynomials", topics: "solving polynomial equations by factoring, like 2x²−8x−14=10" },
  { id: "SOSy-KRa83s", title: "Chapter 5 — Set to Zero Polynomial (a)", topics: "setting polynomial equal to zero, factoring to solve, (x+?)(x+?)=0" },
  { id: "Pa_8SVI4eJY", title: "Chapter 5 — Set to Zero Polynomial (b)", topics: "higher degree polynomials set to zero, like 2x⁶−50x⁴+50x²=2x⁴" },
  { id: "Qb86dN_6b48", title: "Review — Multiplying Fractions with Binomials in the Numerator", topics: "multiplying fractions with binomial numerators, simplifying products of binomials over numbers" },
  { id: "o7M0VCxSraQ", title: "Chapter 6 — Layered and Fractional Exponents", topics: "EVALUATING expressions where exponents are fractions or decimals like ½ or ¾, nested power rule (x^a)^b = x^(ab), like (16^½)³ or (x^¼)^(3/2). NOT about expanding binomials like (x+4)^6" },
  { id: "cYZjBt8qVOI", title: "Chapter 6 — Layered & Fractional Exponents with Negative Numbers", topics: "EVALUATING fractional exponents with negative bases, like [(-4)²]^(3/4) or (3⁻¹)^½. Exponents are fractions, NOT whole numbers" },
  { id: "6s_tr9KNkTA", title: "Chapter 6 — Layered & Fractional Exponents with Fractional Bases", topics: "EVALUATING when both the base AND exponent are fractions, like [(16/81)²]^½. NOT about expanding (a+b)^n" },
  { id: "IL5H9ra38rs", title: "Chapter 6 — Rewrite Using Fractional Exponents, Then Simplify", topics: "converting radical expressions (√, ³√, ⁴√) into fractional exponent notation, like ⁴√x = x^(1/4). NOT about binomial expansion" },
  { id: "5o_3UP73fQE", title: "Chapter 7 — Simplifying with Imaginary Numbers", topics: "imaginary numbers, √−1 = i, i² = −1, simplifying √−19, √−64x⁴" },
  { id: "gOyHf5Ubg44", title: "Chapter 7 — Adding and Subtracting with Imaginary Numbers", topics: "adding/subtracting complex numbers, √−4 + √−100, combining real and imaginary parts" },
  { id: "LZrXbKJGgjk", title: "Chapter 7 — Simplifying Powers of Imaginary Numbers", topics: "powers of i, i cycle: i¹=i, i²=−1, i³=−i, i⁴=1, simplifying i^n" },
  { id: "TMsOXmabxxI", title: "Chapter 7 — Multiplication with Imaginary Numbers", topics: "multiplying imaginary numbers, (i⁵)(−9i), √−5·√−6, FOIL with i" },
  { id: "dR7O9JOaEXk", title: "Chapter 8 — Finding & Multiplying Conjugates", topics: "conjugates, A+B → A−B, multiplying conjugate pairs, (3+2i)(3−2i), difference of squares" },
  { id: "u3ntPgV8A1s", title: "Chapter 8 — Simplifying Fractional Expressions Using Conjugates", topics: "rationalizing denominators with conjugates, fractions with i or radicals in denominator" },
  { id: "cG72EwCkCKc", title: "Chapter 9 — Cubing Binomials", topics: "expanding (a+b)³ or (a−b)³ — a binomial raised to the THIRD power specifically, like (2A−2B)³ or (3x−2)³. Uses Pascal's triangle row 1,3,3,1" },
  { id: "nzoNuJOnjQA", title: "Chapter 10 — Expanding Binomials Using Binomial Theorem", topics: "EXPANDING (a+b)^n where n is a whole number ≥4, using binomial theorem and Pascal's triangle. Like expanding (A+7)⁶ or (x+y)⁵ into all terms. The problem looks like (something + something)^integer" },
  { id: "g8Wj_AhcVg4", title: "Chapter 10 — Expanding Binomials with Negatives and Coefficients", topics: "EXPANDING binomials that have MINUS signs or coefficients in front of variables, like (2x−2Y)⁴, (x−4)⁶, (3a−b)⁵. ANY binomial with a subtraction sign raised to a power belongs here. Uses binomial theorem with careful sign tracking" },
  { id: "Wt5sLKJL-hg", title: "Chapter 10 — Finding the n-th Term When Expanding Binomials", topics: "finding ONE specific term in a binomial expansion WITHOUT expanding the whole thing. Like 'find the 5th term of (2x−9)⁹' or 'find the nth term of (x−4)⁶'" },
  { id: "MgjZr7HuoOE", title: "Chapter 11 — Completing the Square", topics: "completing the square, x²+10x+___, finding the missing term to make perfect square trinomial" },
  { id: "-ZjEdBPzCXA", title: "Chapter 11 — Completing the Square with Fractions", topics: "completing the square with fractional coefficients, like x²+3x+___ or x²−⅓x+___" },
  { id: "Bi82WkOySqo", title: "Chapter 11 — Finding x by Completing the Square", topics: "solving quadratic equations by completing the square, like x²−5x+4=0" },
  { id: "vZVkRbY320Q", title: "Chapter 12 — Quadratic Formula", topics: "quadratic formula x=(-b±√(b²-4ac))/2a, solving ax²+bx+c=0, like x²−6x+2=0" },
  { id: "uw2ZvTwGmuI", title: "Chapter 12 — Quadratic Formula with Only Two Terms", topics: "quadratic formula when b or c term is missing, like 3x²+5x=0" },
  { id: "jnDIDbv4jt8", title: "Chapter 12 — Quadratic Formula with Fractions", topics: "quadratic formula with fractional coefficients, like ⅔x²+⅚x=0" },
  { id: "b6kteaJfejo", title: "Chapter 13 — Discriminants", topics: "discriminant D=b²−4ac, determining number/type of solutions, real vs imaginary roots" },
  { id: "Lt6-JJ6F_GM", title: "Chapter 14 — Find the Percentage of an Atomic Element in a Compound", topics: "percent composition, atomic weight, finding percentage of element in chemical compound like SiO₂" },
  { id: "yI3_vbsy35Y", title: "Chapter 14 — Basic Problem Types", topics: "percentage problems, markup, discount, tax, profit percentage, word problems with percentages" },
  { id: "Iuajfh_gJh8", title: "Chapter 15 — Solving for a Variable", topics: "isolating a variable, rearranging formulas, like solving APG=H for A, or Q=RS+RT for R" },
  { id: "0P9G5BJwL3c", title: "Chapter 16 — Ratio Word Problems", topics: "ratio word problems, setting up proportions from word problems, 'the ratio of A to B is 3 to 5, if there are 12 A's how many B's?', cross-multiplying to solve ratios" },
  { id: "n62zjr83kWw", title: "Chapter 16 — Atomic Weight Ratio Word Problems", topics: "finding mass of an element in a compound using atomic weights and ratios, like 'what is the mass of Fluorine in 480 grams of CF₂Cl₂' or '550 grams of K₂S, find mass of potassium', periodic table atomic mass ratio method" },
  { id: "1LmxbABtuUg", title: "Chapter 17 — Basic Unit Multiplier Conversions", topics: "basic unit conversions using unit multipliers, setting up conversion factor fractions so units cancel, like converting 5 yards to feet or 3 hours to minutes. Single-step conversions within the same measurement system. NOT square/cubed units, NOT metric-to-imperial" },
  { id: "mOgCWkTgwHk", title: "Chapter 17 — Square & Cubed Unit Multipliers", topics: "converting SQUARE and CUBIC units using unit multipliers, like 3 ft² to in² or 2 m³ to cm³. Must square or cube the conversion factor, not just multiply once. Area and volume unit conversions. NOT basic linear conversions" },
  { id: "Qa0yOn0pvWc", title: "Chapter 17 — Converting Between Metric and Imperial Using Unit Multipliers", topics: "converting between metric and imperial units using unit multipliers with given conversion factors, like kilometers to miles, gallons to liters, pounds to kilograms. Cross-system conversions where the conversion factor is provided" },
  { id: "Qex5nmL-Ng8", title: "Chapter 18 — Basic D=RT Word Problems", topics: "basic distance-rate-time word problems using D = R × T (distance equals rate times time). ONE object/traveler with two of the three quantities given, solving for the third. Like 'Shane drove at 45 mph for 4 hours, how far?' or 'tortoise covered 36 yards in 72 minutes, what is the rate?'. Single-object D=RT only — NOT two trains, NOT two travelers" },
  { id: "5IqYFLbLH2s", title: "Chapter 18 — D=RT with Two Objects", topics: "distance-rate-time word problems with TWO different objects or modes of transportation. Two trains at different speeds, one person driving then walking back, two people leaving at different times, jet skis with different rates. Set up D₁ = D₂ or use a time offset (T₁ + Δt = T₂), then solve a system. Like 'two trains at 45 mph and 35 mph, slower took 0.4 hr longer, how far?' or 'Gerry left at 4pm at 55 mph, Joe left an hour later and caught up at 9pm, how fast was Joe?'" },
  { id: "mtJW3ptiYpE", title: "Chapter 19 — Two-Rate Distance Word Problems", topics: "D=RT word problems where ONE traveler changes pace partway through the trip — like a horse that trots, then walks, or a person who runs, then walks. You're given total distance and total time. Set up two equations (D₁ + D₂ = total distance, T₁ + T₂ = total time) using D=RT for each segment, then solve by substitution for the time spent at each rate. NOT two separate travelers — one traveler with two phases" },
  { id: "S0xNFwJxZv4", title: "Chapter 20 — Find Slope & Intercept From a Graph", topics: "reading slope (m) and y-intercept (b) directly off a line drawn on a coordinate plane. Estimate the slope by counting rise over run between two lattice points. Estimate the y-intercept by reading where the line crosses the y-axis. Like 'estimate the slope and intercept of this line' problems with a graph shown. NOT about equations — input is a graphed line, output is m and b values" },
  { id: "brn9uwZPPes", title: "Chapter 20 — Convert Between Slope-Intercept and Standard Form", topics: "converting linear equations between slope-intercept form (y = mx + b) and standard form (Ax + By = C, where A is a positive integer, no fractions). Standard → slope-intercept: solve for y by moving the x term and dividing through. Slope-intercept → standard: move the x term to the left, clear fractions by multiplying through, ensure A is positive. Like converting 3x + 2y = 9 to y = -3x/2 + 9/2, or y = (2/3)x + 6 to 2x - 3y = -18. NOT graphing, NOT finding slope from points" },
  { id: "HWCHXKQMJrI", title: "Chapter 21 — Find Slope, Intercept, and Both Forms, Then Graph", topics: "the full Chapter 21 line-equation problem: given EITHER a slope and a point on the line (like 'slope 2 through (-2,-5)'), OR two points on the line (like '(-2,2) and (3,-4)'), find m and b, write the equation in slope-intercept (y = mx + b) and standard form (Ax + By = C), and graph it. Uses the two-point slope formula m = (y₂-y₁)/(x₂-x₁) when two points are given, then substitutes into y = mx + b to solve for b. End-to-end problem combining slope, intercept, both forms, and graphing" },
  { id: "_PM9383mM6M", title: "Chapter 21 — Parallel and Perpendicular Lines", topics: "finding the equation of a line that is PARALLEL or PERPENDICULAR to a given line and passes through a specified point. Parallel: same slope (m₁ = m₂). Perpendicular: slopes are negative reciprocals (m₁ · m₂ = -1). Like 'find the line parallel to y = 3x + 2 through (0,0)' or 'find the line perpendicular to y = -x + 4 through (0,0)'. Plug new slope and point into y = mx + b to solve for b, then write the equation" },
  { id: "oKAlbBIHLDs", title: "Chapter 21 — Graphing Inequalities", topics: "graphing linear inequalities on a coordinate plane, like y ≤ −4x − 2 or −2y ≥ 8x + 4. First solve for y (FLIP the inequality when dividing or multiplying by a negative). Then draw the boundary line: SOLID for ≤ or ≥ (boundary included), DASHED for < or > (boundary excluded). Then shade the half-plane: above the line for y ≥, below the line for y ≤. NOT about solving inequalities algebraically without graphing" },
];

export default async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "POST only" }), { status: 405 });
  }

  try {
    const body = await req.json();
    const { image, problemNumbers } = body;
    if (!image) {
      return new Response(JSON.stringify({ error: "No image provided" }), { status: 400 });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "API key not configured" }), { status: 500 });
    }

    const client = new Anthropic({ apiKey });

    // Use media type from frontend if provided, otherwise detect from magic bytes
    let mediaType = body.mediaType || "image/jpeg";
    if (!body.mediaType) {
      if (image.startsWith("iVBOR")) mediaType = "image/png";
      else if (image.startsWith("/9j/")) mediaType = "image/jpeg";
      else if (image.startsWith("R0lG")) mediaType = "image/gif";
      else if (image.startsWith("UklG")) mediaType = "image/webp";
    }

    const videoCatalog = VIDEOS.map(
      (v, i) => `${i + 1}. "${v.title}" — ${v.topics}`
    ).join("\n");

    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2000,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image",
              source: {
                type: "base64",
                media_type: mediaType,
                data: image,
              },
            },
            {
              type: "text",
              text: `You are a math tutor's assistant. A student has sent a photo of a math problem they need help with.

${problemNumbers ? `The image may contain multiple numbered problems. The student wants help specifically with problem(s): ${problemNumbers}. Focus ONLY on those problem numbers — look for them in the image (they will be labeled with numbers like "14." or "17)").` : `Look at the image and identify what type of math problem it is.`}

IMPORTANT DISTINCTION: If the problem shows (something + something)^n or (something − something)^n where n is a whole number, that is BINOMIAL EXPANSION (Chapters 9-10), NOT fractional exponents (Chapter 6). Chapter 6 is ONLY for when the exponent itself is a fraction like ½ or ¾.

Match to ALL relevant videos from this catalog. Many math concepts build on each other — for example, a problem might require finding the GCF first, then using it to simplify a fraction, so both GCF and simplification videos would be relevant. Similarly, some problems can be solved multiple ways (factoring, completing the square, quadratic formula), so all applicable method videos should be included.

Video catalog:
${videoCatalog}

IMPORTANT MATCHING RULES:
1. Treat EACH problem individually. Analyze what makes each one unique — don't lump them together. A "find the nth term" problem is NOT the same as "expand fully," even if both involve binomials raised to powers.
2. If a problem contains negative signs or subtraction (like (x−4)^6 vs (x+4)^6), the "with negatives" video variant is ALWAYS relevant because sign handling is a common mistake.
3. Always prefer the MOST SPECIFIC video over a general one. If a video exists for the exact sub-type (e.g., "finding nth term" vs general "expanding binomials"), the specific one should be "exact" and the general one should be "overview."

Categorize each matching video as one of these types:
- "exact" — this video teaches the EXACT problem type shown in the image (same structure, same technique needed)
- "overview" — this video covers a broader topic that includes this problem type, good for context
- "prerequisite" — the student should understand this concept first before tackling the problem
- "alternative" — a different method that could also solve this problem
- "variation" — this video covers a variation of the problem that handles a tricky aspect (like negative signs or coefficients)

${problemNumbers ? `The student specified multiple problems. You MUST group results by problem number. Use this JSON format:

{"problems": [{"problemNumber": "<the number from the image>", "matches": [{"number": <video 1-50>, "type": "exact"|"overview"|"prerequisite"|"alternative"|"variation", "reason": "<why>"}]}, ...], "explanation": "<what you see in the image>"}

Each problem gets its OWN matches array. Do NOT combine problems that need different techniques.` : `Respond in this JSON format:

{"problems": [{"problemNumber": "1", "matches": [{"number": <video 1-50>, "type": "exact"|"overview"|"prerequisite"|"alternative"|"variation", "reason": "<why>"}]}], "explanation": "<what you see in the image>"}`}

Include 1-5 matches per problem depending on how many are truly relevant. Don't pad with irrelevant videos. Always identify the most specific "exact" match possible. Keep reasons SHORT (under 15 words each). Output ONLY valid JSON, no other text.

If you truly cannot identify any math in the image, respond:
{"problems": [], "explanation": "I couldn't identify a math problem in this image."}`,
            },
          ],
        },
      ],
    });

    let text = response.content[0].text.trim();
    // Strip markdown code fences if present
    if (text.startsWith("```")) {
      text = text.replace(/^```(?:json)?\s*\n?/, "").replace(/\n?```\s*$/, "");
    }
    // Try to extract JSON if there's extra text around it
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) text = jsonMatch[0];

    let result;
    try {
      result = JSON.parse(text);
    } catch (parseErr) {
      console.log("RAW RESPONSE:", response.content[0].text);
      console.log("CLEANED TEXT:", text);
      console.log("PARSE ERROR:", parseErr.message);
      result = { problems: [], explanation: "Could not parse response. Raw: " + text.substring(0, 200) };
    }

    // Enrich matches with video data — handle both grouped and flat formats
    if (result.problems && result.problems.length > 0) {
      result.groups = result.problems.map(p => ({
        problemNumber: p.problemNumber,
        videos: (p.matches || [])
          .filter(m => m.number >= 1 && m.number <= 50)
          .map(m => {
            const video = VIDEOS[m.number - 1];
            return {
              title: video.title,
              url: `https://www.youtube.com/watch?v=${video.id}`,
              id: video.id,
              type: m.type || "overview",
              reason: m.reason,
            };
          }),
      }));
      // Also flatten for backwards compatibility
      result.videos = result.groups.flatMap(g => g.videos);
    } else if (result.matches && result.matches.length > 0) {
      // Fallback for flat format
      result.videos = result.matches
        .filter(m => m.number >= 1 && m.number <= 50)
        .map(m => {
          const video = VIDEOS[m.number - 1];
          return {
            title: video.title,
            url: `https://www.youtube.com/watch?v=${video.id}`,
            id: video.id,
            type: m.type || "overview",
            reason: m.reason,
          };
        });
    }

    return new Response(JSON.stringify(result), {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
    });
  }
};

export const config = { path: "/api/match-problem" };
