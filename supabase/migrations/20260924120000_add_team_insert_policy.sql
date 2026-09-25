-- Add RLS policies for team creation during onboarding

-- Allow authenticated users to create teams
CREATE POLICY "Users can create teams"
  ON public.teams FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- Allow users to add themselves as team members
CREATE POLICY "Users can add themselves to teams"
  ON public.team_members FOR INSERT
  WITH CHECK (auth.uid() = user_id);
