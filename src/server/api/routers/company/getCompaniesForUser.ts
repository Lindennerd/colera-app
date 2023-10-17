import { and, eq } from "drizzle-orm";
import { protectedProcedure } from "~/server/api/trpc";
import { company, companyUsers } from "~/server/db/schema";

export const getCompaniesForUser = protectedProcedure.query(({ ctx }) => {
  const companies = ctx.db
    .select({
      id: company.id,
      name: company.name,
    })
    .from(company)
    .leftJoin(
      companyUsers,
      and(
        eq(company.id, companyUsers.companyId),
        eq(companyUsers.userId, ctx.session.user.id)
      )
    );
  return companies;
});
